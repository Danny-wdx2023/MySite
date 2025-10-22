---
title: Dijkstra
createTime: 2025/10/22 20:36:22
permalink: /algo/dijkstra/
tags:
  - 图论
  - 贪心
---

# Dijkstra

:::card
## Dijkstra资料卡
解决的问题：单源最短路  
优势：**高效且稳定**  
复杂度：用优先队列优化后为 $O(m\log_{2}n)$ 是最高效的最短路算法  
思想：**“抄近路走，一定能找到最短路”**，是贪心思想  
边权：不允许有负数
:::

## 过程
1. 在 $s$ 的所有直连邻居中，最近的邻居 $u$ 可以确定 $s-u$ 是到达 $u$ 的最短路径  
2. $u$ 和 $s$ 的所有直连邻居中，选择最近邻居 $v$，它也可以确定最短路径
3. 继续以上步骤，**每次迭代过程中都能确定一个结点的最短路径**，这是其稳定性的保证

:::tip
处理过程中，需要找到所有目前可以一步连通的结点中，路径最短的一个。  
如果不优化，每次将可以一步连通的所有结点直接插入队列尾，查找速度 $O(n)$，扩展过程有 $m$ 次，总复杂度 $O(mn)$ 与 Bellman-Ford 一样；  
考虑使用优先队列优化，查找速度降为 $O\log_{2}n$，总复杂度降为 $O(m\log_{2}n)$
:::

## 模板代码

```cpp
#include <bits/stdc++.h>
using namespace std;

const int INF = 1e6;
const int NUM = 105;
struct edge {
    int from, to, w;
    edge(int a, int b, int c) : from(a), to(b), w(c) {}
};
vector<edge> e[NUM];
struct node {
    int id, n_dis;
    node(int b, int c) : id(b), n_dis(c) {}
    bool operator<(const node& other) const { return n_dis > other.n_dis; }
};
int n, m;
int pre[NUM];

void print_path(int s, int t) {
    if (s == t) {
        cout << s << " ";  // 输出起点
        return;
    }
    print_path(s, pre[t]);  // 输出前驱结点
    cout << t << " ";       // 输出当前结点，至终点为止
}

void dijkstra() {
    int s = 1;
    int dis[NUM];    // 最短路径
    bool done[NUM];  // 一个结点是否已被处理过
    fill(dis, dis + NUM, INF), fill(done, done + NUM, 0);  // 初始化

    dis[s] = 0;              // 起点
    priority_queue<node> Q;  // 处理队列
    Q.push(node(s, 0));      // 起点入队
    while (!Q.empty()) {
        node u = Q.top();
        Q.pop();
        if (done[u.id]) continue;             // 已处理过的丢弃
        done[u.id] = true;                    // 标记为已处理
        for (edge y : e[u.id]) {              // 枚举u的邻居
            if (done[y.to]) continue;         // 已处理过的丢弃
            if (dis[y.to] > y.w + u.n_dis) {  // 松弛
                dis[y.to] = y.w + u.n_dis;
                Q.push(node(y.to, dis[y.to]));
                pre[y.to] = u.id;  // 标记为前驱结点
            }
        }
    }
    cout << dis[n] << endl;
    print_path(s, n);
}
int main() {
    cin >> n >> m;
    for (int i = 1; i <= n; ++i) e[i].clear();
    while (m--) {
        int a, b, c;
        cin >> a >> b >> c;
        e[a].push_back(edge(a, b, c));
        e[b].push_back(edge(b, a, c));
    }
    dijkstra();
    return 0;
}
```
