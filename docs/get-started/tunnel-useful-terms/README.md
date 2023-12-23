# 术语表

查看 Cloudflare 隧道的术语。

## Tunnel

隧道是一条安全的、仅限出站的路径，您可以在源站和 Cloudflare
的全球网络之间建立。您创建的每个隧道都将被分配一个[名称](#tunnel-name)和一个[UUID](#tunnel-uuid)。

## Tunnel UUID

隧道 UUID 是分配给隧道的字母数字唯一 ID。每当您需要引用特定隧道时，都可以使用隧道 UUID。

## Tunnel name

隧道名称是您为隧道选择的唯一的、用户友好的标识符。由于隧道可以将流量代理到多个服务，因此隧道名称不需要是主机名。
例如，您可以为隧道分配一个代表您的应用程序/网络、特定服务器或其运行的云环境的名称。

## Connector

连接器（称为 ）cloudflared建立从源服务器到 Cloudflare 全球网络的连接。
我们的连接器通过创建与 Cloudflare 全球网络内两个不同数据中心的四个长期连接来提供高可用性。
这种内置冗余意味着，如果单个连接、服务器或数据中心出现故障，您的源仍然可用。

## Replica

您可以创建和配置一次隧道，然后通过连接器 ```cloudflared``` 的多个唯一实例运行该隧道。 这些实例称为副本。
DNS 记录和 Cloudflare 负载均衡器仍将指向隧道及其 DNS 记录 (```UUID.cfargotunnel.com```)，而该隧道将流量发送到通过它运行的多个
```cloudflared``` 实例。 如今，无法保证会选择哪个副本。 通常部署副本以在运行 ```cloudflared``` 的给定主机中断或脱机时提供高可用性的隧道。

## Remotely-managed tunnel

远程管理隧道是在网络 > 隧道下的零信任中创建的隧道。 隧道配置存储在 Cloudflare 中，它允许您从仪表板或使用 API 管理隧道。

远程管理的隧道是在[零信任](https://one.dash.cloudflare.com/)中 Networks > Tunnels 创建的[隧道](#tunnel)。
隧道配置存储在 Cloudflare
中，它允许您从仪表板或使用[API](https://developers.cloudflare.com/api/operations/cloudflare-tunnel-configuration-get-configuration)
管理隧道。

## Locally-managed tunnel

本地管理的隧道是通过在命令行上运行 ```cloudflared tunnel create <NAME>``` 创建的隧道。
隧道配置存储在您的本地 ```cloudflared``` 目录中。

### Default `cloudflared` directory

```cloudflared``` 在存储隧道的凭证文件时使用默认目录，以及在您运行 ```cloudflared``` 登录时生成的 ```cert.pem``` 文件。
如果运行隧道时未指定其他文件路径，则默认目录也是 ```cloudflared``` 查找配置文件的位置。

| OS                          | 默认路径                                                                        |
|-----------------------------|-----------------------------------------------------------------------------|
| Windows                     | `%USERPROFILE%\.cloudflared`                                                |
| macOS and Unix-like systems | `~/.cloudflared`, `/etc/cloudflared`, 和 `/usr/local/etc/cloudflared`, 这个顺序。 |

### Configuration file

这是一个 YAML 文件，充当`cloudflared`的操作手册。 `cloudflared` 将自动寻找
配置文件位于 [默认 `cloudflared` 目录](#default-cloudflared-directory)，但您可以将配置文件存储到您的
任意目录下。 建议始终指定配置文件的文件路径。 通过创建配置文件，您可以对其实例的方式进行细粒度控制
`cloudflared` 的运行。 这包括诸如您希望`cloudflared`对流量执行的操作（
例如，代理 websockets 到端口 `xxxx` 或 SSH 到端口 `yyyy`），其中 `cloudflared` 应搜索授权（
凭证文件、隧道令牌），以及它应该以什么模式运行（
例如，[`warp-routing`](/private-net/))。 在没有配置的情况下
文件中，cloudflared 将通过端口`8080`代理出站流量。 有关如何创建、存储和使用的更多信息
构造一个配置文件，参考
[专用说明](/configure-tunnels/local-management/configuration-file/)。

### Cert.pem

这是当您运行`cloudflared tunnel login`时由 Cloudflare 颁发的证书文件。 该文件使用证书
验证您的`cloudflared`实例，当您创建新隧道、删除现有隧道、更改 DNS 记录，或从 `cloudflared` 配置隧道路由时需要它。
执行以下操作不需要此文件：从 Cloudflare 仪表板运行现有隧道或管理隧道路由。 参考
[隧道权限页面](/configure-tunnels/local-management/tunnel-permissions/)
有关何时需要此文件的更多详细信息。

`cert.pem` 原始证书的有效期至少为 10 年，并且它包含的服务令牌的有效期直到撤销。

### Credentials file

该文件是在您运行`cloudflared tunnel create <NAME>`时创建的。 它将您的隧道凭证存储在 JSON 格式中，
并且对于每个隧道都是唯一的。 该文件用作验证与其关联的隧道的令牌。 有关何时需要此文件的更多详细信息，请参考
[隧道权限页面](/configure-tunnels/local-management/tunnel-permissions/)。

### Ingress rule

入口规则允许您指定应代理哪些本地服务流量。 如果规则没有指定路径，则所有
路径将被匹配。 入口规则可以列在您的[配置文件](/configure-tunnels/local-management/configuration-file/)
或者运行`cloudflared tunnel ingress`。

## Quick tunnels

快速隧道运行时将生成一个 URL，其中包含网站`trycloudflare.com`的随机子域，并且
将流量指向端口`8080`上的本地主机。 如果您在该地址运行 Web 服务，则访问该地址的用户生成的子域名将能够通过 Cloudflare 的网络访问您的 Web 服务。
了解更多有关如何运行快速隧道的信息前往
 [TryCloudflare](/do-more-with-tunnels/trycloudflare/) 参考。

## Virtual networks

[虚拟网络](/private-net/cloudflared/tunnel-virtual-networks/) 是一个软件抽象，允许您在逻辑上隔离专用网络上的资源。 虚拟网络是
对于公开具有重叠 IP 路由的资源特别有用。 要连接到资源，最终用户将在输入目标 IP 之前，在 WARP 客户端设置中选择虚拟网络。
