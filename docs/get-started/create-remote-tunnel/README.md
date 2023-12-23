# 创建远程管理隧道（仪表板）

按照此分步指南，使用零信任建立并运行您的第一个隧道。

## 先决条件

在开始之前，请确保：

- [将网站添加到 Cloudflare](https://developers.cloudflare.com/fundamentals/setup/account-setup/add-site/)。
- [将您的域名服务器更改为 Cloudflare](https://developers.cloudflare.com/dns/zone-setups/full-setup/setup/)。

## 1. 创建隧道

1. 登录[零信任](https://one.dash.cloudflare.com/)并转到**Networks > Tunnels**。对于某些用户，隧道创建位于**Access > Tunnels**下。
2. 选择**Create a tunnel**。
3. 输入隧道的名称。我们建议选择一个反映您想要通过此隧道连接的资源类型的名称（例如，**enterprise-VPC-01**）。
4. 选择**Save tunnel**。
5. 接下来，您需要安装`cloudflared`并运行它。为此，请检查**Choose an environment**下的环境是否是您计算机上的操作系统，然后复制下面框中的命令并将其粘贴到终端窗口中。运行命令。
6. 命令运行完成后，您的连接器将出现在“零信任”中。
![connector_hu70dbed6dcf0f0d817d9159993adf82fb_60050_906x740_resize_q75_box_3-55059427.webp](/img/connector_hu70dbed6dcf0f0d817d9159993adf82fb_60050_906x740_resize_q75_box_3-55059427.webp)
7. 选择**Next**。

接下来的步骤取决于您是要[连接应用程序](#_2-连接应用程序)还是[连接网络](#_3-连接网络)。

## 2. 连接应用程序

请按照以下步骤通过隧道连接应用程序。如果您要连接网络，请跳至[连接网络](#_3-连接网络)部分。

1. 在**Public Hostnames**选项卡中，从下拉菜单中选择一个应用程序并指定任何子域或路径信息。
2. 指定一个服务，例如`https://localhost:8000`。
3. 在**其他应用程序设置**下，指定您想要添加到隧道配置中的任何[参数](/configure-tunnels/origin-configuration/)。
4. 选择**Save `<tunnel-name>`**。

## 3. 连接网络

请按照以下步骤通过隧道连接专用网络。

1. 在**Private Networks**选项卡中，添加 IP 或 CIDR。
2. 选择**Save `<tunnel-name>`**。

## 4. 查看您的隧道

保存隧道后，您将被重定向到**Tunnels**页面。查找要列出的新隧道及其活动连接器。

![Tunnel appearing in the Tunnels table](/img/tunnel-table_hu0aa9e676c90dae20df4b9b6663dad78a_69317_1738x370_resize_q75_box_3-d14a310e.webp)

> **故障排除**
> 
> 如果您在设置隧道时遇到问题，请参阅[故障排除常见问题解答](https://developers.cloudflare.com/cloudflare-one/faq/cloudflare-tunnels-faq/#how-can-i-troubleshoot-a-tunnel-that-was-configured-from-zero-trust)。
