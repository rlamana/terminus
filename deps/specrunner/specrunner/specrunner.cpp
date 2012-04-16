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

#if QT_VERSION < QT_VERSION_CHECK(4, 7, 0)
#error Use Qt 4.7 or later version
#endif

class HeadlessSpecRunner: public QObject
{
    Q_OBJECT
public:
    HeadlessSpecRunner();
    void load(const QString &spec);
public slots:
    void log(int indent, const QString &msg);
private slots:
    void watch(bool ok);
protected:
    bool hasElement(const char *select);
    void timerEvent(QTimerEvent *event);
private:
    QWebPage m_page;
    QBasicTimer m_ticker;
    int m_runs;
};

HeadlessSpecRunner::HeadlessSpecRunner()
    : QObject()
    , m_runs(0)
{
    m_page.settings()->enablePersistentStorage();
    connect(&m_page, SIGNAL(loadFinished(bool)), this, SLOT(watch(bool)));
}

void HeadlessSpecRunner::load(const QString &spec)
{
    m_ticker.stop();
    m_page.mainFrame()->load(spec);
    m_page.setPreferredContentsSize(QSize(1024, 600));
}

void HeadlessSpecRunner::watch(bool ok)
{
    if (!ok) {
        std::cerr << "Can't load' " << qPrintable(m_page.mainFrame()->url().toString()) << std::endl;
        QApplication::instance()->exit(1);
        return;
    }

    m_ticker.start(200, this);
}

bool HeadlessSpecRunner::hasElement(const char *select)
{
    return !m_page.mainFrame()->findFirstElement(select).isNull();
}

void HeadlessSpecRunner::log(int indent, const QString &msg)
{
    for (int i = 0; i < indent; ++i)
        std::cout << "  ";
    std::cout << qPrintable(msg);
    std::cout << std::endl;
}

#define DUMP_MSG "(function(n, i) { if (n.toString() === '[object NodeList]') { for (var c = 0; c < n.length; ++c) arguments.callee(n[c], i); return } if (n.className === 'description' || n.className == 'resultMessage fail') debug.log(i, n.textContent); var e = n.firstElementChild; while (e) { arguments.callee(e, i + 1); e = e.nextElementSibling; } })(document.getElementsByClassName('suite failed'), 1);"

void HeadlessSpecRunner::timerEvent(QTimerEvent *event)
{
    if (event->timerId() != m_ticker.timerId())
        return;

    if (!hasElement(".jasmine_reporter") && !hasElement(".runner.running"))
        return;

    if (hasElement(".runner.passed")) {
        QWebElement desc = m_page.mainFrame()->findFirstElement(".description");
        std::cout << qPrintable(desc.toPlainText()) << std::endl;
        QApplication::instance()->exit(0);
        return;
    }

    if (hasElement(".runner.failed")) {
        QWebElement desc = m_page.mainFrame()->findFirstElement(".description");
        std::cout << "FAIL: " << qPrintable(desc.toPlainText()) << std::endl;
        m_page.mainFrame()->addToJavaScriptWindowObject("debug", this);
        m_page.mainFrame()->evaluateJavaScript(DUMP_MSG);
        QDesktopServices::openUrl(m_page.mainFrame()->url());
        QApplication::instance()->exit(1);
        return;
    }

    ++m_runs;
    if (m_runs > 20) {
        std::cout << "WARNING: too many runs and the test is still not finished!" << std::endl;
        QApplication::instance()->exit(1);
    }
}

#include "specrunner.moc"

int main(int argc, char** argv)
{
    if (argc != 2) {
        std::cerr << "Run Jasmine's SpecRunner headlessly" << std::endl << std::endl;
        std::cerr << "  specrunner SpecRunner.html" << std::endl;
        return 1;
    }

    QApplication app(argc, argv);

    HeadlessSpecRunner runner;
    runner.load(QString::fromLocal8Bit(argv[1]));
    return app.exec();
}

