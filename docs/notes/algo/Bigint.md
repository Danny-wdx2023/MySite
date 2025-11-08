---
title: 高精度
createTime: 2025/11/08 10:46:55
permalink: /algo/bigint/
tags:
  - 基础
  - 模拟
---

# 高精度

:::card

## 高精度资料卡

解决的问题：C++标准的整数类型精度太低  
复杂度：用优先队列优化后为 $O(m\log_{2}n)$  
思想：**模拟竖式**
:::

## 过程

其实没什么好说的，看代码吧

## 模板代码

```cpp
#include <bits/stdc++.h>
using namespace std;

struct bignum {
    int num[2010] = {};
    int len = 0;
    bignum() {}
    bignum(string from) {
        for (int i = from.size() - 1; i >= 0; --i) {
            num[len++] = from[i] - '0';
        }
    }
    bignum(long long from) {
        do {
            num[len++] = from % 10;
        } while (from /= 10);
    }
    int& operator[](int idx) { return num[idx]; }

    bignum operator*(int b) {
        bignum res;
        for (int i = 0; i < 2000; ++i) {
            res[i] = num[i] * b;
        }
        for (int i = 0; i < 2000; ++i) {
            if (res[i] >= 10) {
                res[i + 1] += res[i] / 10;
                res[i] %= 10;
            }
        }
        return res;
    }
    bignum operator*(bignum b) {
        bignum res;
        for (int i = 0; i < 2000; ++i) {
            for (int j = 0; j < 2000; ++j) {
                res[i + j] += num[i] * b[j];
            }
        }
        for (int i = 0; i < 2000; ++i) {
            if (res[i] >= 10) {
                res[i + 1] += res[i] / 10;
                res[i] %= 10;
            }
        }
        return res;
    }
    bignum operator+(bignum b) {
        bignum res;
        for (int i = 0; i < 2000; ++i) {
            res[i] = res[i] + num[i] + b[i];
            if (res[i] >= 10) {
                res[i + 1] += res[i] / 10;
                res[i] %= 10;
            }
        }
        return res;
    }
    string asstr(int digits = 2000) {
        stringstream ss;
        bool flag = false;
        for (int i = digits - 1; i > 0; i--) {
            if (num[i] != 0) flag = true;
            if (flag) ss << num[i];
        }
        ss << num[0];
        return ss.str();
    }
    void print() { cout << asstr(); }
};

int main() {
    string s1, s2;
    cin >> s1 >> s2;
    (bignum(s1) + bignum(s2)).print();
    return 0;
}
```

:::tip
TLE $\rightarrow$ 其实高精度可以用快速傅里叶变换加速，但这需要一定数学基础，以后我可能会抽空讲。

MLE $\rightarrow$ 由于 int 本身可以存储约 $10^9$ 量级的数字，在空间卡得很紧的情况下，可以考虑用 vector&lt;int&gt; 代替 int[]，以及一个元素存 4 位（因为在乘法时 $10^5 \times 10^5 = 10^{10}$ 会溢出 int），也许我也会抽空说说。

纯懒 $\rightarrow$ 如果 int 换为 long long 也无法过，并且不想写高精度，可以尝试 \_\_int128，范围更大，非标准但 g++ 支持良好。注意：由于非标准，需要手搓输入输出，参考如下

```cpp
// ...
void print(__int128 x) {
    if (x < 10) {
        cout << char(x + '0');
        return;
    }
    print(x / 10);
    print(x % 10);
}
int main() {
    // ...
    __int128 a = 0;
    string s;
    cin >> s;
    for (char c : s) {
        a = a * 10 + c - '0';
    }
    print(a);
    // ...
}
```

:::

## 另请参阅

- [矩阵快速幂](MatFastPow.md)
