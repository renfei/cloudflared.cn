---
title: Cloudflare Tunnel
---
# Cloudflare Tunnel 中文文档

Cloudflare Tunnel 为您提供了一种将资源连接到 Cloudflare 的安全方法，无需公共路由 IP 地址。使用 Tunnel，您不会将流量发送到外部
IP — 相反，基础设施中的轻量级守护程序 (```cloudflared```) 会创建与 Cloudflare 全球网络的仅出站连接。Cloudflare Tunnel 可以将
HTTP Web 服务器、[SSH 服务器](./use-cases/ssh/)、[远程桌面](./use-cases/rdp/)和其他协议安全地连接到
Cloudflare。这样，您的源站就可以通过
Cloudflare 提供流量，而不会受到绕过
Cloudflare 的攻击。

请参阅我们的[参考架构](https://developers.cloudflare.com/reference-architecture/sase-reference-architecture/)
，了解有关如何在现有基础设施中实施 Cloudflare Tunnel 的详细信息。

## 运行原理

Cloudflared 在您的资源和 Cloudflare 的全球网络之间建立出站连接（隧道）。隧道是将流量路由到 DNS
记录的持久对象。在同一个隧道中，您可以cloudflared根据需要运行任意多个进程（连接器）。这些进程将建立与 Cloudflare
的连接并将流量发送到最近的 Cloudflare 数据中心。

![HTTP 请求如何到达与 Cloudflare Tunnel 连接的资源](/img/handshake_hufad68abf6107ffc2ef859ebe1b42b6e2_299675_1768x1102_resize_q75_box-3f75968f.webp)
