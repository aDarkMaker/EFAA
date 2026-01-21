import { useState } from 'react'

import { Header } from '@/views/dashboard/components/header'
import { SearchBar } from '@/views/dashboard/news/components/search-bar'

import { CodeBlock } from './components/code-block'
import { DocContent } from './components/doc-content'
import { DocMeta } from './components/doc-meta'
import { InfoBox } from './components/info-box'
import { StepList } from './components/step-list'

export const Help: React.FC = () => {
  const [searchValue, setSearchValue] = useState('')

  return (
    <div className='flex-1 flex flex-col'>
      <Header
        title='帮助文档中心'
        subtitle='开发指南'
        rightAction={
          <div className='hidden lg:block'>
            <SearchBar
              placeholder='搜索文档 (Cmd + K)'
              value={searchValue}
              onChange={setSearchValue}
            />
          </div>
        }
      />

      <div className='flex-1 overflow-hidden'>
        <DocContent>
          <DocMeta
            lastUpdated='2023年10月24日'
            readTime='5分钟'
            version='v2.0.4'
          />

          <h1 className='font-bold text-3xl lg:text-5xl mb-8 text-text-main leading-tight'>
            安装与环境配置指南
          </h1>

          <div className='text-base lg:text-lg leading-relaxed text-text-gray'>
            <p className='mb-5 text-justify'>
              欢迎使用我们的新一代开发平台。本指南将帮助您在本地环境中快速设置并运行开发套件。在开始之前，请确保您的系统满足最低配置要求。
            </p>

            <InfoBox>
              <div>
                <strong>提示：</strong> 如果您使用的是企业版账号，请直接参考《企业部署白皮书》进行私有化部署。
              </div>
            </InfoBox>

            <h2 className='font-bold text-2xl lg:text-3xl mt-8 lg:mt-12 mb-5 text-text-main border-b border-border pb-4'>
              1. 系统环境要求
            </h2>
            <p className='mb-5 text-justify'>
              为了获得最佳的性能体验，建议在以下操作系统版本中运行：
            </p>
            <ul className='mb-5 pl-5'>
              <li className='mb-2.5'>
                <strong>macOS:</strong> 版本 10.15 (Catalina) 或更高版本
              </li>
              <li className='mb-2.5'>
                <strong>Windows:</strong> Windows 10 64-bit 或 Windows 11
              </li>
              <li className='mb-2.5'>
                <strong>Linux:</strong> Ubuntu 20.04+, CentOS 8+, Debian 10+
              </li>
            </ul>

            <h2 className='font-bold text-2xl lg:text-3xl mt-8 lg:mt-12 mb-5 text-text-main border-b border-border pb-4'>
              2. 通过命令行安装
            </h2>
            <p className='mb-5 text-justify'>
              我们推荐使用 CLI 工具进行一键安装，这是最快的方式。打开您的终端工具，执行以下命令：
            </p>

            <CodeBlock>
              $ curl -fsSL https://api.dev-platform.com/install.sh | sh
            </CodeBlock>

            <p className='mb-5 text-justify'>安装完成后，验证安装是否成功：</p>

            <CodeBlock>
              $ dev-cli --version{'\n'}dev-cli version 2.0.4 build 2023-10-24
            </CodeBlock>

            <h2 className='font-bold text-2xl lg:text-3xl mt-8 lg:mt-12 mb-5 text-text-main border-b border-border pb-4'>
              3. 配置初始化
            </h2>
            <p className='mb-5 text-justify'>
              首次运行需要进行简单的初始化配置，主要是绑定您的开发者账号和设置本地存储路径。
            </p>

            <StepList
              items={[
                {
                  title: '登录账号',
                  content: (
                    <p>
                      运行 <code className='bg-bg-sidebar px-1.5 py-0.5 rounded'>dev-cli login</code> 命令，浏览器将自动打开授权页面。
                    </p>
                  ),
                },
                {
                  title: '创建项目空间',
                  content: (
                    <p>
                      使用 <code className='bg-bg-sidebar px-1.5 py-0.5 rounded'>dev-cli init my-project</code> 初始化一个新的工作目录。
                    </p>
                  ),
                },
                {
                  title: '拉取依赖',
                  content: (
                    <p>
                      进入目录并执行 <code className='bg-bg-sidebar px-1.5 py-0.5 rounded'>dev-cli install</code> 下载必要的插件。
                    </p>
                  ),
                },
              ]}
            />

            <h2 className='font-bold text-2xl lg:text-3xl mt-8 lg:mt-12 mb-5 text-text-main border-b border-border pb-4'>
              常见安装问题
            </h2>
            <p className='mb-5 text-justify'>
              如果在安装过程中遇到权限错误（Permission denied），请尝试使用 sudo 权限运行安装脚本，或者检查目标目录的读写权限。
            </p>
            <p className='mb-5 text-justify'>
              对于网络连接超时的问题，建议配置国内镜像源：
            </p>
            <CodeBlock>
              $ dev-cli config set registry https://registry.npmmirror.com
            </CodeBlock>
          </div>
        </DocContent>
      </div>
    </div>
  )
}
