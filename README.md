NODEJS

#### expose garbage collector for debugging memory issues

```bash
$ node --expose-gc --inspect index.js
```

#### increase the heap memory for the program

```bash
$ node --max-old-space-size=6000 index.js
```
