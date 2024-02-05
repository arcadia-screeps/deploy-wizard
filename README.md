# screeps-deploy-wizard

- [简介](#简介)
- [平台兼容性](#平台兼容性)
- [环境要求](#环境要求)
- [用法](#用法)
  - [初级预设](#初级预设)
  - [高级预设](#高级预设)
- [配置](#配置)
  - [语言](#语言)
- [比较](#比较)
  - [screeps](#screeps)
  - [screeps-launcher](#screeps-launcher)
  - [screeps-deploy-wizard(本项目)](#本项目)



## 简介

基于 screeps-launcher 的 Screeps 服务器命令行工具。用于生成 screeps-launcher 所需的 config.yaml，以及一些其他的便利功能。

本脚手架提供 2 种预设启动方式：

1. 裸机启动。禁用了 screepsmod-mongo。
2. docker 启动。强制启用了 screepsmod-mongo。

| 启动方式 | 不安装 mongo mod                               | 安装 mongo mod                                   |
| -------- | ---------------------------------------------- | ------------------------------------------------ |
| 裸机启动 | 直接使用 screeps-launcher 启动（primary 预设） | 需要裸机安装 mongo 与 redis 并手动管理（不推荐） |
| docker   | 使用基于 LokiJS 库的存储                       | 自动化管理服务（advacned 预设）                  |

:bulb: 基于 screeps-launcher，必须安装 `screepsmod-admin-util`，以允许解析 `config.yaml` 中的 `server-config` 段



## 平台兼容性

本脚手架程序适用于如下平台：

* Windows
* Linux

:bulb: Mac 平台未经测试



## 环境要求

* Node.js 16 LTS 或更高版本
* Docker （如果应用高级预设）



## 用法

查看帮助信息

```sh
screeps-deploy-wizard
screeps-deploy-wizard --help

# 或者使用缩写

sdw
sdw --help
```



### 初级预设

初始化生成 `config.yaml`，用于 screeps-launcher 启动。

```sh
sdw init
```

跟随交互式命令行，并选择 `Primary` 预设。



### 高级预设

初始化生成 `config.yaml` 与 `docker-compose.yaml`，用于后续服务运行。

```sh
sdw init
```

跟随交互式命令行，并选择 `Advanced` 预设。



使用 docker 启动服务，服务定义在 `docker-compose.yaml` 中

```sh
sdw start
```



screeps-server 容器使用 screeps-launcher 镜像，容器启动时会解析 `config.yaml` ，安装运行环境以及指定的 mod，最后再启动 screeeps 服务器。此过程会花费较长时间，请查看容器日志确认进度。

输出 screeps-server 容器日志

```sh
sdw logs
```

等待日志不再滚动输出，并输出类似于如下信息，则表示 screeps 服务器启动成功，玩家可使用 steam 客户端连接到它。

```sh
2024/01/31 14:38:05 Initializing server
2024/01/31 14:38:05 Writing mods.json
2024/01/31 14:38:05 Writing 9 mods and 1 bots
2024/01/31 14:38:05 Starting Server
2024/01/31 14:38:05 Started
2024/01/31 14:38:05 [main] exec: screeps-engine-main
2024/01/31 14:38:05 [runner] exec: screeps-engine-runner
2024/01/31 14:38:05 [backend] exec: screeps-backend
2024/01/31 14:38:05 [processor_0] exec: screeps-engine-processor
2024/01/31 14:38:05 [processor_1] exec: screeps-engine-processor
```



验证 screeps 服务器可正常响应。在宿主机上运行命令行：

```sh
curl http://localhost:21025

# 可能会提示重定向到如下地址

curl http://localhost:21025/web
```

如果返回一份 HTML 文件，包含配置的 Welcom Text，说明 screeps 服务器可正常提供服务。



需要初始化数据库，清除所有用户数据时。首先连接到 screeps-launcher 的 CLI：

```sh
sdw	cli

# 或者在 screeps-server 容器中执行指令 screeps-launcher cli

docker exec -ti screeps-server screeps-launcher cli
```

:warning: 必须加上 `-ti` 选项，否则会显示报错信息 `panic: no such device or address`



然后在 CLI 中运行 `system.resetAllData()`，并使用 `Ctrl-d` 退出 CLI。最后重启容器：

```sh
sdw restart
```



若要终止服务，执行如下命令退出并移除所有服务相关的容器。

```sh
sdw stop
```



## 配置

可以通过如下两种方法对脚手架进行配置：

1. 使用命令 `sdw config` 管理所有配置项
2. 直接修改配置文件



配置文件路径如下：

*  Linux 与 Mac：`$HOME/.screep-deploy-wizard/config.json`

*  Windows：`$HOME\.screep-deploy-wizard\config.json`



### 语言

本脚手架支持中英双语，使用 `language` 配置项进行语言切换。

```sh
# 英文
sdw config set language en

# 中文
sdw config set language zh
```



## 比较

### screeps

[screeps](https://github.com/screeps/screeps) 是官方项目，官方描述如下

>This project is a distributed, standalone game server that allows you to launch your own game world on a local computer or dedicated server on the Internet.
>
>该项目是一个分布式、独立的游戏服务器，允许您在本地计算机或互联网上的专用服务器上启动自己的游戏世界。

screeps 提供官方 npm 包。但是项目长时间不更新，最新版 [Release v3.4.0](https://github.com/screeps/screeps/releases/tag/v3.4.0) 发布在 2019 年。并且安装与运行所需环境十分老旧，安装时需要 nodegyp 搭配 python2 进行构建。经过实践证明，最好在 Ubuntu 上使用 node:10 环境安装 screeps 包。

```sh
# 根据提示，输入 Steam API key
npx screeps init

# 启动服务器
npx screeps start

# 连接到服务器的命令行交互界面，必须先启动服务器
npx screeps cli
>> help() # 输入 help() 查看可用的命令
```



为了不破坏服务器环境，最好打包成镜像并运行。下面提供一份非官方的 dockerfile：

```dockerfile
ARG STEAM_API_KEY

# 分阶段构建镜像
# BUILDER 阶段使用 ubuntu 镜像安装所需的 node 包
FROM ubuntu:16.04 AS BUILDER

# apt 换源，下载基础依赖
RUN sed -i 's@//.*archive.ubuntu.com@//mirrors.ustc.edu.cn@g' /etc/apt/sources.list  && \
    apt update && \
    apt install -y build-essential tcl git curl gcc g++ make

# 安装 node:10.x
RUN curl -sL https://deb.nodesource.com/setup_10.x | bash - && \
    apt install -y nodejs

# 安装 yarn
RUN curl -sL https://dl.yarnpkg.com/debian/pubkey.gpg | gpg --dearmor | tee /usr/share/keyrings/yarnkey.gpg >/dev/null && \
    echo "deb [signed-by=/usr/share/keyrings/yarnkey.gpg] https://dl.yarnpkg.com/debian stable main" | tee /etc/apt/sources.list.d/yarn.list && \
    apt-get update && apt-get install -y yarn

# 创建并切换工作目录
WORKDIR /screeps

# yarn 换源并下载 mod 与 screeps 服务器包
RUN yarn config set registry https://registry.npmmirror.com && \
    yarn add \
        screepsmod-admin-utils  \
        screepsmod-mongo  \
        screepsmod-auth  \
        screepsmod-features \
        screeps

FROM node:10.24-slim AS base-server
ARG STEAM_API_KEY
# 使用 screeps 用户而非 root 用户运行
RUN groupadd --gid 1000 screeps \
  && useradd --uid 1000 --gid screeps --shell /bin/bash --create-home screeps \
  && mkdir /screeps && chown screeps.screeps /screeps
USER screeps
# 暴露 /screeps 卷
VOLUME /screeps
WORKDIR /screeps

# 从 BUILDER 阶段复制 node_modules, package.json, yarn.lock
COPY --from=BUILDER /screeps/ ./
# 覆盖默认配置文件
COPY ./mods.json ./.screepsrc ./
# 使用参数 STEAM_API_KEY 初始化
RUN sh -c '/bin/echo "${STEAM_API_KEY}" | npx screeps init'
ENTRYPOINT ["npx", "screeps", "start"]
```



:bulb: 使用说明：

1. 新建文件夹 `screeps-server` ，存放 `dockerfile` 以及其他文件

2. 创建文件 `mods.json`，内容如下：

   ```json
   {
       // 启用的 mod 列表。必须是安装的所有 mod 的子集
       "mods": [
           "node_modules/screepsmod-mongo/index.js",
           "node_modules/screepsmod-auth/index.js",
   	    "node_modules/screepsmod-tickrate/index.js",
       	"node_modules/screepsmod-admin-utils/index.js",
       	"node_modules/screepsmod-features/index.js"
       ],
       
       // npc 机器人使用的脚本
       "bots": {
           "simplebot": "node_modules/@screeps/simplebot/src"
       }
   }
   ```

3. 创建文件 `.screepsrc`，这是一个 ini 格式的配置文件。使用 ` screeps start [option]` 启动时，所有选项会自动保存到该文件中，因此也可以直接修改`.screepsrc` 文件来指定服务器启动的选项。 

   ```ini
   ;If you launch the server without running the local Steam client,
   ;then the Steam Web API key is required for authenticating users.
   ;It can be obtained on this page: http://steamcommunity.com/dev/apikey
   steam_api_key = 
   
   ;The port number on which the game server should listen.
   port = 21025
   
   ;The hostname on which the game server should listen.
   host = 0.0.0.0
   
   ;The server password which should be provided on user sign in.
   password =
   
   ;The port number on which the CLI server should listen. Defaults to port+1.
   cli_port = 21026
   
   ;The hostname on which the CLI server should listen.
   cli_host = localhost
   
   ;The number of player runner worker processes to launch.
   ;Setting this option to more than 1 will lead to multiple simultaneous global environments
   ;for each player, it is not recommended for basic setup.
   runners_cnt = 1
   
   ;The number of parallel runner threads in which player scripts are executed. Don't set this
   ;option greater than the number of your physical CPU cores.
   runner_threads = 4
   
   ;The number of room processor worker processes to launch. Don't set this
   ;option greater than the number of your physical CPU cores.
   processors_cnt = 2
   
   ;The path to directory where logs will be created.
   logdir = logs
   
   ;The path to JSON file with the list of custom mods to load.
   modfile = mods.json
   
   ;The path to directory where static assets are located.
   assetdir = assets
   
   ;The path to the database file.
   db = db.json
   
   ;If set, forward console messages to terminal
   log_console = false
   
   ;How many log files to keep when rotating.
   log_rotate_keep = 5
   
   ;If set, disable built-in storage, useful when you use some other implementation.
   storage_disabled = false
   
   ;Automatically restart child processes.
   restart_interval = 3600
   ```

4. 使用如下指令构建镜像：

   ```sh 
   docker build \
   	--network host \ # 指定 host 网络，以安装环境依赖
   	--build-arg STEAM_API_KEY="" \ # 指定服务器使用的 STEAM_API_KEY
   	-f ./dockerfile \ # 指定 dockerfile 路径
   	-t screeps-server:latest \ # 指定镜像名 
   	.
   ```

5. 使用如下命令运行镜像：

   ```sh
   docker run \
   	-d \ # 以后台模式运行，避免关闭终端后容器立刻终止
   	--name screeps-server \ # 指定容器名
   	-v screeps-server:/screeps \ # 使用卷标，由 docker 自动创建卷
   	-p 21025:21025 \ # 暴露 21025 接口，以便容器可以向外提供服务
   	screeps-server:latest
   ```



### screeps-launcher

screeps-launcher 使用 `config.yaml`（或 `config.yml`）作为配置文件。以下所有配置项及其默认值都是从 screeps-launcher 源代码中获取得到的。

```yml
# config.yaml
steamKey: # 你的 Steam API key
steamKeyFile: "STEAM_KEY" # 存放 Steam API key 的文件路径
cli: # 配置 screeps-launcher cli，缺省与 screeps cli 相同
  host: "127.0.0.1"
  port: 21026
  username: ""
  password: ""
env: # 环境变量设置，应用到 screeps 服务器以及 mods 上
  shared:
    MODFILE: "mods.json"
    STORAGE_HOST: "127.0.0.1",
    STORAGE_PORT: "21027",    
  backend:
    GAME_HOST: "0.0.0.0",
    GAME_PORT: "21025",
    CLI_HOST:  "127.0.0.1",
    CLI_PORT:  "21026",
    ASSET_DIR: "assets",
  engine:
    DRIVER_MODULE: "@screeps/driver",
  storage:  
    DB_PATH: "db.json",
processors: # 缺省是当前进程可使用的系统的逻辑 CPU 核心数。runtime.NumCPU()
runnerthreads: # 缺省 math.Max(1, float64(processors)-1)
version: "latest" # 指定 screeps 版本。缺省 latest
nodeVersion: "Erbium" # 指定 Nodejs 版本，缺省 Erbium
mods: # mod 配置列表
bots: # bot 配置列表
extraPackages:
pinnedPackages:
    ssri: "8.0.1",
    cacache: "15.3.0",screep
    passport-steam: "1.0.17",
    minipass-fetch: "2.1.2",
    express-rate-limit: "6.7.0",
localMods: "./mods" # 本地 mod 的列表
backup: # 配置备份
  dirs: # 备份目录列表
  files: # 备份文件列表
modules: # screeps 服务器使用的模块，查看 https://github.com/screeps/screeps?tab=readme-ov-file#modules
  backend: true
  main: true
  processor: true
  runner: true
  storage: true
```



****

若安装了 [screepsmod-admin-utils](https://github.com/ScreepsMods/screepsmod-admin-utils)，则 `config.yaml` 文件中可以添加`serverConfig` 段。

`screepsmod-admin-utils` 识别的字段与样例值如下：

```yaml
# config.yaml
# Most of these fields will live reload on save. 
# Values set here will override any saved via CLI on server startup
serverConfig: 
  map: random_1x2 # utils.importMap will be called automatically with this value, see utils.importMap above
  tickRate: 200
  socketUpdateRate: 200
  whitelist: # Does not restrict login, only restricts spawning
  - ags131
  - zeswarm
  shardName: 'screepsplus1' # 默认宿主机的 hostname
  constants:
  	# 默认 1000000
  	GCL_MULTIPLY:
  	# 默认 2.4
  	GCL_POW: 
    UPGRADE_POWER: 10
    POWER_CREEP_SPAWN_COOLDOWN: 3600000 # 1 Hour
    POWER_CREEP_DELETE_COOLDOWN: 3600000
  welcomeText: |
    <h1>Welcome</h1>
    <div>Powered by screepsmod-admin-utils</div>
  statsToken: ...splusToken... # This enables submitting stats to S+ Grafana. Note: shardName MUST be set
  # 默认 false
  gclToCPU: true
  # 默认 300
  maxCPU: 100 
  # 默认 20
  baseCPU: 20 
  # 默认 10
  stepCPU: 10
```

:bulb: 上述所有字段都是可选的。

:bulb:  若要指定 `map` 字段，必须安装 `screepsmod-mong`

* 请访问 [maps.screepspl.us](https://maps.screepspl.us/) 网站，或者执行 `curl https://maps.screepspl.us/maps/index.json` 直接查看源数据。
* 每个地图有对应的 `ID` 以及可选的 `Width` 与 `Height`。
* 若设置 `map` 字段为地图 ID，则会导入对应地图
* 若设置 `map` 字段为 `random` 或者 `randow_WxH`（例如 `random_1x2`），则会随机导入或者按指定的地图宽高随机导入。

:bulb: 当服务器启动后，修改`serverConfig` 字段的值会重新加载到服务器中。但是修改 `config.yaml` 的其他字段不会。



****

写在 `serverConfig` 段中的所有配置会覆盖 screeps 使用的 `.screepsrc` 配置。以部分 `.screepsrc` 配置与 `screepsmod-mongo` 的配置为例：

* 在 `.screepsrc` 中：

  ```ini
  ;The port number on which the game server should listen.
  port = 21025
  ;The hostname on which the game server should listen.
  host = 0.0.0.0
  ;The server password which should be provided on user sign in.
  password =
  
  ;The following configuration is for screepsmod-mongo if installed
  [mongo]
  host = mongo
  port = 27017
  database = screeps
  
  [redis]
  host = redis
  port = 6379
  ```

* 在 `config.yaml` 中：

  ```yaml
  serverConfig:
  	port: 21025
  	host: "0.0.0.0"
  	password: ""
  	mongo:
  		host: mongo
  		port: 21017
  		database: screeps
  	redis:
  		host: redis
  		port: 6379
  ```

:bulb: 具体原理：`ini` 文件与 `yaml` 文件都是键值对的形式，因此可以相互转换。而`ini` 文件中使用 `[]` 表示一个节，节内可以存放任意数量的键值对，对应 `yaml` 中的一个嵌套对象，例如：节`[mongo]` 对应 `serverConfig.mongo` 对象。



### 本项目

本项目基于 screeps-launcher，目的不是为了开发新的启动器，而是为那些想在短时间内搭建起一个可运行的 screeps 私人服务器的玩家们提供两种预设的启动方式；并且为使用 docker 运行服务的用户提供一些便利的脚手架命令。

玩家需要先使用 `screeps-deploy-wizard init` 或者缩写 `sdw init`，跟随交互式命令行配置一些必要的选项，脚手架会根据选择的预设生成启动 screeps 服务器所必须的文件。

对使用 Primary 预设的玩家，可以直接使用本脚手架生成的 `config.yaml`，参考 [screeps-launcher/Usage](https://github.com/screepers/screeps-launcher?tab=readme-ov-file#usage) 中的说明，使用 `screeps-launcher` 命令启动服务器。（需要先从 screeps-launcher 的 [Releases](https://github.com/screepers/screeps-launcher/releases) 页面下载一份发行版）

对使用 Advanced 预设的玩家，会同时运行 screeps-server，mongo 与 redis 三个容器，并使用 docker compose 进行统一管理。玩家可以使用 `sdw` 提供的命令，简化对服务的管理，或者使用 docker 命令进行更精细的操作。
