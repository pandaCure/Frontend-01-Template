# 正则表达式
## api
- match
- replace
- exec

## match
- ?:() 不捕获

```
"abc".match(/a(b)c/)
"[a=value]".match(/\[([^=]+)=([^\]]+)\]/)
```
## replace
```
"abc".replace(/a(b)c/,function(str,$1){
    console.log(str,$1)
}
```