# 创建本地管理隧道 (CLI)

按照此分步指南，使用 CLI 启动并运行您的第一个隧道。

## 先决条件

在开始之前，请确保：

- [将网站添加到 Cloudflare](https://developers.cloudflare.com/fundamentals/setup/account-setup/add-site/)。
- [将您的域名服务器更改为 Cloudflare](https://developers.cloudflare.com/dns/zone-setups/full-setup/setup/)。

## 1.下载并安装`cloudflared`

### Windows 系统

1. 下载`cloudflared`到您的机器上。访问下载页面找到适合您操作系统的软件包。
2. 将可执行文件重命名为`cloudflared.exe`
3. 在 PowerShell 中，将目录更改为“下载”文件夹并运行`.\cloudflared.exe --version`。如果您尚未重命名它应该输出`cloudflared`
   。请注意，这`cloudflared.exe`可能是`cloudflared-windows-amd64.exe`或者`cloudflared-windows-386.exe`。

```shell
PS C:\Users\Administrator\Downloads\cloudflared-stable-windows-amd64> .\cloudflared.exe --version
```

### MacOS 系统

下载并安装`cloudflared`：

```shell
brew install cloudflare/cloudflare/cloudflared
```

或者，您可以直接[下载最新的 Darwin amd64 版本](https://developers.cloudflare.com/cloudflare-one/connections/connect-networks/downloads/)。

### Linux 系统

#### Debian 和 Ubuntu APT

`cloudflared`使用 apt 包管理器在兼容的计算机上安装。

1. 添加 Cloudflare 的包签名密钥：

```shell
sudo mkdir -p --mode=0755 /usr/share/keyrings
curl -fsSL https://pkg.cloudflare.com/cloudflare-main.gpg | sudo tee /usr/share/keyrings/cloudflare-main.gpg >/dev/null
```

2. 将 Cloudflare 的 apt 存储库添加到您的 apt 存储库：

```shell
echo "deb [signed-by=/usr/share/keyrings/cloudflare-main.gpg] https://pkg.cloudflare.com/cloudflared $(lsb_release -cs) main" | sudo tee /etc/apt/sources.list.d/cloudflared.list
```

3. 更新存储库并安装 cloudflared：

```shell
sudo apt-get update && sudo apt-get install cloudflared
```

#### RHEL RPM

使用 rpm 包管理器在兼容的计算机上安装`cloudflared`。

1. 添加 Cloudflare 的存储库：

```shell
curl -fsSL https://pkg.cloudflare.com/cloudflared-ascii.repo | sudo tee /etc/yum.repos.d/cloudflared.repo
```

2. 更新存储库并安装 `cloudflared`：

```shell
sudo yum update && sudo yum install cloudflared
```

#### Arch Linux

`cloudflared`位于 Arch Linux [community存储库](https://wiki.archlinux.org/title/official_repositories#community)中。
用于`pacman`安装`cloudflared`在兼容的机器上。

```shell
pacman -Syu cloudflared
```

#### 其他

或者，您可以将`cloudflared`二进制或 Linux 软件包下载到您的计算机上并手动安装。访问下载页面找到适合您操作系统的软件包。

### 从源代码编译

要从源代码构建最新版本`cloudflared`：

```shell
git clone https://github.com/cloudflare/cloudflared.git
cd cloudflared
make cloudflared
go install github.com/cloudflare/cloudflared/cmd/cloudflared
```

根据您的安装位置`cloudflared`，您也可以将其移动到已知路径。

```shell
mv /root/cloudflared/cloudflared /usr/bin/cloudflared
```

## 2. 认证`cloudflared`

```shell
cloudflared tunnel login
```

运行此命令将：

- 打开浏览器窗口并提示您登录 Cloudflare 帐户。登录您的帐户后，选择您的主机名。
- 在[默认目录](/get-started/tunnel-useful-terms/#default-cloudflared-directory)
  中生成帐户证书，即[cert.pem](/get-started/tunnel-useful-terms/#certpem) 文件。

## 3. 创建隧道并命名

```shell
cloudflared tunnel create <NAME>
```

运行此命令将：

- 通过在[您提供的名称](/get-started/tunnel-useful-terms/#tunnel-name)
  和隧道的[UUID](/get-started/tunnel-useful-terms/#tunnel-uuid)之间建立持久关系来创建隧道。此时，隧道内还没有活动连接。
- 在[默认目录](/get-started/tunnel-useful-terms/#default-cloudflared-directory)
  中生成[隧道凭证文件](/get-started/tunnel-useful-terms/#credentials-file)。
- 创建`.cfargotunnel.com`的子域。

从命令的输出中，记下隧道的 UUID 和隧道凭证文件的路径。

通过运行以下命令确认隧道已成功创建：

```shell
cloudflared tunnel list
```

## 4. 创建配置文件

1. 在您的目录中，使用任何文本编辑器`.cloudflared`
   创建一个[config.yml文件](/configure-tunnels/local-management/configuration-file/)。该文件将配置隧道以将流量从给定来源路由到您选择的主机名。
2. 将以下字段添加到文件中：

**如果您要连接应用程序：**

```yaml
url: http://localhost:8000
tunnel: <Tunnel-UUID>
credentials-file: /root/.cloudflared/<Tunnel-UUID>.json
```

**如果您连接的是专用网络：**

```yaml
tunnel: <Tunnel-UUID>
credentials-file: /root/.cloudflared/<Tunnel-UUID>.json
warp-routing:
    enabled: true
```

3. 通过运行以下命令确认配置文件已成功创建：

```shell
cat config.yml
```

## 5. 开始路由流量

1. 现在分配一条CNAME记录，将流量指向您的隧道子域：

- 如果您要连接应用程序，请将服务路由到公共主机名：

```shell
cloudflared tunnel route dns <UUID or NAME> <hostname>
```

- 如果您要连接[专用网络](/private-net/)，请通过隧道路由 IP 地址或 CIDR：

```shell
cloudflared tunnel route ip add <IP/CIDR> <UUID or NAME>
```

2. 确认路由已成功建立：

```shell
cloudflared tunnel route ip show
```

## 6. 运行隧道

运行隧道以代理从隧道到源本地运行的任意数量的服务的传入流量。

```shell
cloudflared tunnel run <UUID or NAME>
```

如果您的配置文件具有自定义名称或不在`.cloudflared`目录中，请添加`--config`标志并指定路径。

```shell
cloudflared tunnel --config /path/your-config-file.yml run <UUID or NAME>
```

> Cloudflare Tunnel 可以将自身安装为 Linux 和 Windows 上的系统服务，以及 macOS 上的启动代理。有关详细信息，请参阅[作为服务运行](/configure-tunnels/local-management/as-a-service/)。

## 7. 检查隧道

您的隧道配置已完成！如果您想获取有关刚刚创建的隧道的信息，您可以运行：

```shell
cloudflared tunnel info <UUID or NAME>
```

您现在可以使用 Cloudflare DNS将[流量路由](/routing-to-tunnel/)到隧道，或确定谁可以使用 Cloudflare Access [访问您的隧道](https://developers.cloudflare.com/cloudflare-one/policies/access/)。
