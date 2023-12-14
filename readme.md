1.强缓存不需要发送请求，而协商缓存需要每次发送请求到服务器。
2.协商缓存一般是etag和last-modified两种方式一起使用，这是生效的时etag方式。

3.cache-control用法：（请求头和响应头都可以设置）
--public:所有内容都将被缓存（客户端和代理服务器都可缓存）
--private：内存只缓存到私有缓存中（仅客户端可以缓存，代理服务器不可以缓存）
--no-cache：（协商缓存设置）浏览器缓存资源，但是请求时不直接使用缓存资源，需要发送请求到服务器，进行协商缓存判断。
--no-store：绝对禁止缓存，每次都从服务器请求资源。请求时，请求头不会有if-modified-since和if-none-match。
--s-maxage：覆盖max-age或者Expires头，但是仅适用于共享缓存 (比如各个代理)，私有缓存会忽略它。
--no-transform：不得对资源进行转换或转变。Content-Encoding、Content-Range、Content-Type等 HTTP 头不能由代理修改。例如，非透明代理或者如Google’s Light Mode可能对图像格式进行转换，以便节省缓存空间或者减少缓慢链路上的流量。no-transform指令不允许这样做。
--only-if-cached：表明客户端只接受已缓存的响应，并且不要向原始服务器检查是否有更新的拷贝。

--max-age:设置资源有效时间段
----如果请求和响应同时设置了max-age，则缓存以服务响应设置的值为准。
----如果请求头设置了max-age=0，则不使用缓存，发起请求到服务器；如果请求头设置了max-age != 0，并且请求资源已经有缓存时，不会使用请求头的max-age值来判断缓存资源是否过期。

4.请求头设置cache-control字段：
--no-cache：表明不使用缓存，从服务器获取最新的资源。（服务器也不会返回304，因为请求头中不会带上if-modified-since和if-none-match字段）
--max-age=0：（走协商缓存的逻辑）--表明不能直接使用缓存，需要先去服务端验证。

4.expires用法：
--(1)GMT时间，缓存的过期时间，在此时间之前，不会向服务器发送请求，直接使用缓存资源
--(2) -1:缓存立即过期

5.协商缓存：
Cache-Control: no-cache
或者：
Cache-Control: max-age=0, must-revalidate

6.更正：
expires
last-modified/if-modified-since
etag/if-none-match
都是http/1.0就已经支持的

cache-control是http/1.1才支持的