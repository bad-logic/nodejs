NODEJS

#### profile your application

```bash
$ node --prof program.<js|mjs>
```

#### expose garbage collector for debugging memory issues

```bash
$ node --expose-gc --inspect program.<js|mjs>
```

#### increase the heap memory for the program

```bash
$ node --max-old-space-size=6000 program.<js|mjs>
```
