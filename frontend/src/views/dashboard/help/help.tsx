import { useState } from 'react'

import { DocContent } from './components/doc-content'
import { MarkdownContent } from './components/markdown-content'
import { TableOfContents } from './components/table-of-contents'

// 模拟从ajax获取的markdown文档内容
const mockMarkdownContent = `# 安装与环境配置指南

欢迎使用我们的新一代开发平台。本指南将帮助您在本地环境中快速设置并运行开发套件。在开始之前，请确保您的系统满足最低配置要求。

> **提示：** 如果您使用的是企业版账号，请直接参考《企业部署白皮书》进行私有化部署。

## 1. 系统环境要求

为了获得最佳的性能体验，建议在以下操作系统版本中运行：

- **macOS:** 版本 10.15 (Catalina) 或更高版本
- **Windows:** Windows 10 64-bit 或 Windows 11
- **Linux:** Ubuntu 20.04+, CentOS 8+, Debian 10+

## 2. 通过命令行安装

我们推荐使用 CLI 工具进行一键安装，这是最快的方式。打开您的终端工具，执行以下命令：

\`\`\`bash
$ curl -fsSL https://api.dev-platform.com/install.sh | sh
\`\`\`

安装完成后，验证安装是否成功：

\`\`\`bash
$ dev-cli --version
dev-cli version 2.0.4 build 2023-10-24
\`\`\`

## 3. 配置初始化

首次运行需要进行简单的初始化配置，主要是绑定您的开发者账号和设置本地存储路径。

### 3.1 登录账号

运行 \`dev-cli login\` 命令，浏览器将自动打开授权页面。

### 3.2 创建项目空间

使用 \`dev-cli init my-project\` 初始化一个新的工作目录。

### 3.3 拉取依赖

进入目录并执行 \`dev-cli install\` 下载必要的插件。

## 4. 常见安装问题

如果在安装过程中遇到权限错误（Permission denied），请尝试使用 sudo 权限运行安装脚本，或者检查目标目录的读写权限。

对于网络连接超时的问题，建议配置国内镜像源：

\`\`\`bash
$ dev-cli config set registry https://registry.npmmirror.com
\`\`\`

### 4.1 权限问题

如果遇到权限问题，可以尝试以下解决方案：

1. 使用管理员权限运行
2. 检查目录权限设置
3. 联系系统管理员

### 4.2 网络问题

网络连接问题可能由以下原因导致：

- 防火墙设置
- 代理配置
- DNS解析问题
`

export const Help: React.FC = () => {
  // 这里后续会通过ajax获取，现在先用模拟数据
  const [markdownContent] = useState(mockMarkdownContent)

  return (
    <div className=''>
      {/* 左侧目录栏 - 固定在左侧，使用fixed定位 */}
      <div className='hidden lg:block'>
        <TableOfContents markdown={markdownContent} />
      </div>

      {/* 右侧文档内容 - 添加左边距避免被目录栏遮挡 */}
      <div className='flex-1 overflow-hidden lg:ml-44'>
        <DocContent>
          <MarkdownContent content={markdownContent} />
        </DocContent>
      </div>
    </div>
  )
}
