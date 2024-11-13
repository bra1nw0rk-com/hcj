/*
 * @author Volodymyr Cherniyevskyy
 * @copyright bra1nw0rk.
 * {@link https://github.com/bra1nw0rk-com/hcj GitHub}.
 * {@link https://www.linkedin.com/in/volodymyr-cherniyevskyy-24962b22b LinkedIn}
 */

import ContainerURLS from "./ContainerURLS.js";

export default class WebContainer {
    iframe = $(`<iframe src="/hook.html"></iframe>`)
    contents = null
    head = null;
    body = null
    name = null
    url = ''
    urls= new ContainerURLS()

    constructor(url) {
        this.url = url
        let _this = this

        this.iframe.on('load',function(){
            _this.contents = _this.iframe.contents()
            _this.contents.find('head, body').remove()
            //_this.body.attr("data-url",url)
            _this.loadContent(_this.url, _this.renderPage)
        })


    }

    clear(){
        this.urls.clear()
    }

    set name(value) {
        this.name = value
        this.iframe.attr('src', `/#${value}`)

    }

    renderPage(_this, data) {
        //_this.body.find('*').remove()
        _this.iframe.hide()
        let newDoc = document.implementation.createHTMLDocument("Temp");
        newDoc.documentElement.innerHTML = data;
        let head = $($(newDoc.head)[0])
        var service_worker=document.createElement('script');
        service_worker.type='application/javascript';
        service_worker.src="/hook.js";        
        head.prepend(service_worker)
        //_this.contents.find('html').append(head)
        //_this.contents.find('html').append($(newDoc.body))
        _this.contents = $(newDoc)

        _this.head = _this.contents.find('head')
        _this.body = _this.contents.find('body')
        let count = $(`[name^='container_${_this.name}']`).length
        _this.body.attr('name', `container_${_this.name}${count + 1}`)        

        //_this.head.html($(newDoc.head).html())
        //let body = _this.body.get(0)
        //let shadowRoot = body.shadowRoot || body.attachShadow({mode: 'open'});
        /*
        data = $(data)

        if (data.find(`base`).length > 0) {
            data.find(`base`).attr("href", _this.url)
        } else {
            data.find("body").prepend($(`<base href="${_this.url}">`))
        }
        data.find(`meta, noscript`).remove()
        data.find('a[href]').each(function () {
            let obj = $(this)
            let href = $(this).attr('href');
            if (/^\/(?!\/)/.test(href)) {
                obj.removeAttr("href")
                obj.on('click', function (e) {
                    _this.loadContent(_this.url + href,_this.renderPage)
                });
            }
        })
        data.find('link').each(function () {
            let obj = $(this)
            let href = $(this).attr('href');
            if (/^\/(?!\/)/.test(href)) {
                _this.loadContent(_this.url + href, function (_this, data) {
                    obj.attr('href', _this.urls.add(data,href))
                })
            }


        });

        data.find('script, img').each(function () {
            let obj = $(this)
            let href = $(this).attr('src');
            if (/^\/(?!\/)/.test(href)) {
                _this.loadContent(_this.url + href, function (_this, data) {
                    obj.attr('src',  _this.urls.add(data,href))
                })
            }
        });

         */
        //$(shadowRoot).find('*').remove()
        //_this.body.html($(newDoc.body).html())
        _this.iframe.show()
    }

    loadContent(url, callback) {
        let _this = this
        $.ajax({
            url: `/`,
            type: 'POST',
            contentType: 'application/json',
            crossDomain: true,
            xhrFields: {
                withCredentials: true
            },
            data: JSON.stringify({
                "cmd": "proxy",
                "url": url,
                "method": "GET",
                "headers": []
            })

        }).done(function (data) {
            callback(_this, data)
        }).fail(function (data) {
            console.log(data)
        })
    }

    get() {
        return this.iframe
    }
}