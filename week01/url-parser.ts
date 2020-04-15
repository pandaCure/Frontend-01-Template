export interface IUrlInfo {
  protocol: string
  username: string
  password: string
  hostname: string
  port: string | number
  path: string
  query: string
  hash: string
}
class MockURLSearchParams {
  private cacheSearch: {
    [props: string]: string[]
  }
  public constructor(value: string | URLSearchParams) {
    this.cacheSearch = Object.create(null)
    if (typeof value === 'string') {
      const queryArray = value.replace(/\?/, '').split('&')
      queryArray.forEach((qr) => {
        const handleQr = qr.split('=')
        this.append(
          encodeURIComponent(handleQr[0]),
          handleQr.length > 1 ? encodeURIComponent(handleQr[1]) : ''
        )
      })
    } else if (value instanceof URLSearchParams) {
      value.forEach((value, name) => this.append(name, value))
    } else {
      throw new Error('无效参数')
    }
    // TODO:处理search
  }
  public append(name, value) {
    const valueStr = value.toString()
    if (name in this.cacheSearch) {
      this.cacheSearch[name].push(valueStr)
    } else {
      this.cacheSearch[name] = [valueStr]
    }
  }
  public delete(name) {
    return delete this.cacheSearch[name]
  }
  public get(name: string) {
    return name in this.cacheSearch ? this.cacheSearch[name][0] : null
  }
  public getAll(name: string) {
    return name in this.cacheSearch ? this.cacheSearch[name].slice(0) : []
  }
  public has() {
    return name in this.cacheSearch
  }
  public forEach() {}
  public keys() {}
  public values() {}
  public entries() {}
  public toString(): string {
    return ''
  }
}
class MockURL {
  // 实现base
  private urlInfo: IUrlInfo
  private patterns = {
    protocol: '(?:([^:/?#]+):)',
    authHost: '(?://([^/?#]*))',
    pathname: '([^?#]*)',
    search: '(\\?[^#]*)',
    hash: '(#.*)',
    hostname: '([^:]+)',
    port: '(?::(\\d+))',
    auth: '(?:([^:]*)(?::([^@]*))?@)',
  }
  public constructor(url: string) {
    this.urlInfo = this.parse(this.handleUrl(url))
  }
  public toString(): string {
    return this.href
  }
  private handleUrl(url: string): string {
    // handle leading, trailing CO Ctr and space
    const encodeUrl = encodeURI(url)
    const remoteC0AndSpace = encodeUrl.replace(/^\%20|\%20$/g, '')
    return remoteC0AndSpace
  }
  private parse(url: string): IUrlInfo {
    // https://url.spec.whatwg.org/#url-parsing
    // TODO：假设用户输入的URL格式是正确的、标准的
    const urlRegExp = new RegExp(
      '^' +
        this.patterns.protocol +
        '?' +
        this.patterns.authHost +
        '?' +
        this.patterns.pathname +
        this.patterns.search +
        '?' +
        this.patterns.hash +
        '?'
    )
    const partUrlRegExp = new RegExp(
      '^' +
        this.patterns.auth +
        '?' +
        this.patterns.hostname +
        this.patterns.port +
        '?$'
    )
    console.log(urlRegExp)
    const urlResult: RegExpExecArray | null = urlRegExp.exec(url)
    if (urlResult === null) throw new Error('无效的URL')
    const urlPartResult: RegExpExecArray | null = partUrlRegExp.exec(
      urlResult[2]
    )
    const hasAuthInfo = urlPartResult !== null
    // URL interface
    return {
      protocol: urlResult[1] || '',
      username: hasAuthInfo ? urlPartResult[1] : '',
      password: hasAuthInfo ? urlPartResult[2] : '',
      hostname: hasAuthInfo ? urlPartResult[3] : '',
      port: hasAuthInfo ? urlPartResult[4] : '',
      path: urlResult[3] || '',
      query: urlResult[4] || '',
      hash: urlResult[5] || '',
    }
  }
  // TODO:set method && new URLSearchParams
  public get hostname(): string {
    return this.urlInfo.hostname
  }
  public get host() {
    return this.hostname + (this.port ? ':' + this.port : '')
  }
  public get port(): number | string {
    return this.urlInfo.port
  }
  public get username(): string {
    return this.urlInfo.username
  }
  public get password(): string {
    return this.urlInfo.password
  }
  public get protocol(): string {
    return this.urlInfo.protocol + ':'
  }
  public get pathname(): string {
    return this.urlInfo.path ? this.urlInfo.path : '/'
  }
  public get search(): string {
    return this.urlInfo.query
  }
  public set search(value) {
    let currentValue = value.toString()
    if (value.charAt(0) !== '?') currentValue = '?' + value
    this.urlInfo.query = currentValue
  }
  public get hash() {
    return this.urlInfo.hash
  }
  public get href(): string {
    const authentication =
      this.username || this.password
        ? this.username + (this.password ? ':' + this.password : '') + '@'
        : ''
    return (
      this.protocol +
      '//' +
      authentication +
      this.host +
      this.pathname +
      this.search +
      this.hash
    )
  }
  public get searchParams() {
    const searchParams = new MockURLSearchParams(this.search)
    ;['append', 'delete', 'set'].forEach((methodName) => {
      const method = searchParams[methodName]
      searchParams[methodName] = (...args) => {
        method.apply(searchParams, args)
        this.search = searchParams.toString()
      }
    })
    return searchParams
  }
  public get origin(): string {
    return this.protocol + '//' + this.host
  }
}
class ParserURL {
  private url: string
  private options: object
  private providerURLInfo: URL | MockURL

  public constructor(url: string, options?: object) {
    this.url = url
    this.options = options
    this.providerURLInfo = URL ? new URL(this.url) : new MockURL(this.url)
    // TODO: 访问this代理到this.providerURLInfo上面
  }
  public get origin() {
    return this.providerURLInfo.origin
  }
  public get searchParams() {
    return this.providerURLInfo.searchParams
  }
  // TODO: finish set methods
  public get protocol() {
    return this.providerURLInfo.protocol
  }
  public get username() {
    return this.providerURLInfo.username
  }
  public get password() {
    return this.providerURLInfo.password
  }
  public get host() {
    return this.providerURLInfo.host
  }
  public get hostname() {
    return this.providerURLInfo.hostname
  }
  public get pathname() {
    return this.providerURLInfo.pathname
  }
  public get search() {
    return this.providerURLInfo.search
  }
  public get hash() {
    return this.providerURLInfo.hash
  }
  public get href() {
    return this.providerURLInfo.href
  }
}
export default ParserURL
