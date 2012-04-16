/*
Copyright (c) 2010 Sencha Inc.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/

#include <QtGui>
#include <QtWebKit>
#include <iostream>

class SiteCapture: public QObject
{
    Q_OBJECT
public:
    SiteCapture();
    void load(const QUrl &url, const QString &outputFileName, int width);
signals:
    void finished();
private slots:
    void saveResult(bool ok);
private:
    QWebPage m_page;
    QString m_fileName;
    QImage m_image;
    int m_width;
};

SiteCapture::SiteCapture()
    : QObject()
{
    connect(&m_page, SIGNAL(loadFinished(bool)), this, SLOT(saveResult(bool)));
}

void SiteCapture::load(const QUrl &url, const QString &outputFileName, int width)
{
    m_fileName = outputFileName;
    m_image = QImage();
    m_width = width;
    m_page.mainFrame()->load(url);
    m_page.setPreferredContentsSize(QSize(m_width, m_width * 3 / 4));
}

void SiteCapture::saveResult(bool ok)
{
    if (!ok) {
        std::cerr << "Failed loading " << qPrintable(m_page.mainFrame()->url().toString()) << std::endl;
        emit finished();
        return;
    }

    QSize size = m_page.mainFrame()->contentsSize();
    m_image = QImage(size, QImage::Format_ARGB32_Premultiplied);
    m_image.fill(Qt::transparent);

    QPainter p(&m_image);
    p.setRenderHint(QPainter::Antialiasing, true);
    p.setRenderHint(QPainter::SmoothPixmapTransform, true);
    m_page.setViewportSize(m_page.mainFrame()->contentsSize());
    m_page.mainFrame()->render(&p);
    p.end();

    if (m_image.save(m_fileName, "png"))
        std::cout << "Result saved to " << qPrintable(m_fileName) << std::endl;
    else
        std::cout << "Failed to save to " << qPrintable(m_fileName) << std::endl;

    emit finished();
}

#include "sitecapture.moc"

int main(int argc, char * argv[])
{
    if (argc != 4) {
        std::cout << "Capture a web site and save it to an image file" << std::endl << std::endl;
        std::cout << "  sitecapture url outputfile width" << std::endl << std::endl;
        std::cout << "Examples: " << std::endl;
        std::cout << "  sitecapture www.google.com google.png 1024" << std::endl;
        std::cout << std::endl;
        return 0;
    }

    QApplication a(argc, argv);
    QUrl url = QUrl::fromUserInput(argv[1]);
    QString fileName = QString::fromLocal8Bit(argv[2]);
    int width = QString::fromLatin1(argv[3]).toInt();

    SiteCapture capture;
    QObject::connect(&capture, SIGNAL(finished()), QApplication::instance(), SLOT(quit()));
    capture.load(url, fileName, width);

    return a.exec();
}

