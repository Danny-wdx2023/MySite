---
title: 矩阵快速幂
createTime: 2025/11/08 11:45:33
permalink: /algo/matfastpow/
tags:
    - 数学
    - 递推
---

# 矩阵快速幂

:::card

## 矩阵快速幂资料卡

解决的问题：  
复杂度：快速解决复杂递推关系  
思想：**倍增**  
核心难点：将递推关系转化为矩阵关系
:::

## 例题

以最经典的斐波那契数列为例，分析如下：

1. $F_1=F_2=1, F_{n+2}=F_{n+1}+F_n (n \in \N^*)$
2. **注意到** $F_n = \left[\begin{matrix}1&1\newline1&0\end{matrix} \right]^{n-1}$ （注意力惊人）
3. 上手！

:::details
证明 $F_n = \left[\begin{matrix}1&1\newline1&0\end{matrix} \right]^{n-1}$
:::

## 例题代码

核心代码如下

```cpp
#include <bits/stdc++.h>
using namespace std;
using ll = long long; // or __int128
struct mat {
    ll a1, a2, a3, a4;
    mat() : a1(1), a2(0), a3(0), a4(1) {} // 单位矩阵
    mat(ll b1, ll b2, ll b3, ll b4) : a1(b1), a2(b2), a3(b3), a4(b4) {}
    mat sq() {
        return mat(a1 * a1 + a2 * a3, a1 * a2 + a2 * a4, a3 * a1 + a4 * a3,
                   a3 * a2 + a4 * a4); // 若担心写错，可以写 return *this * *this;
    }
    mat operator*(mat other) {
        return mat(a1 * other.a1 + a2 * other.a3, a1 * other.a2 + a2 * other.a4,
                   a3 * other.a1 + a4 * other.a3,
                   a3 * other.a2 + a4 * other.a4);
    }
};
ll fastpow(int power) {
    --power;
    mat base(1, 1, 1, 0), res;
    while (power) {
        if (power & 1) {
            res = res * base;
        }
        base = base.sq();
        power >>= 1;
    }
    return res.a1;
}
```

:::tip
除了 base 和 return 需要微调，结构体、fastpow 函数核心逻辑等均可复用
:::

:::info
其实抛开 python 的一堆劣势不谈 ~~（抛开事实不谈）~~，python (借助于numpy) 要实现该逻辑极为简单

```python
import numpy as np
def fastpow(power: int) -> int:
    power -= 1
    base, res = np.array([[1,1],[1,0]], dtype=object), np.array([[1,0],[0,1]], dtype=object)
    while power:
        if power & 1: res = res @ base
        base @= base
        power >>= 1
    return res[0,0]
```
其中这个神奇的 `@` 运算符，正是矩阵快速幂的核心——**矩阵乘法**！  
另外说一声，`dtype=object`十分重要，它利用了python内置的int精度无限特性，but 速度稍慢。  
若改为`dtype=int`/ `dtype=np.int64`（默认），则会像C++中的long long一样溢出，but 速度快。  
鱼与熊掌不可得兼！
:::

## 另请参阅

- [高精度](Bigint.md)

## 习题

- [U621853](https://www.luogu.com.cn/problem/U621853) 斐波那契数列，时空卡得很紧，需要高精度
