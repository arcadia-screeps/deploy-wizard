# screeps-deploy-wizard

<img alt="NPM Version" src="https://img.shields.io/npm/v/%40arcadia-screeps%2Fdeploy-wizard?logo=npm"/><img alt="GitHub Release" src="https://img.shields.io/github/v/release/arcadia-screeps/deploy-wizard"/><img alt="NPM Downloads" src="https://img.shields.io/npm/dt/%40arcadia-screeps%2Fdeploy-wizard?label=total%20downloads">![GitHub last commit (branch)](https://img.shields.io/github/last-commit/arcadia-screeps/deploy-wizard/master)<img alt="GitHub License" src="https://img.shields.io/github/license/arcadia-screeps/deploy-wizard"/>

<p align="center">        
    <br />    
    <br />
    <img src="./images/logo.png" alt="Logo" style="zoom:15%;" />
    <br />    
    <br />
A CLI for screeps server based on screep-launcher
    <br />
    <br />
    <a href="README.md">English</a>
    ·
    <a href="README_zh.md">简体中文</a>
    <br />
    <br />
    <a href="#用法">Usage</a>
    ·
    <a href="https://github.com/arcadia-screeps/deploy-wizard/issues">Report Bug</a>
    ·
    <a href="https://github.com/arcadia-screeps/deploy-wizard/issues">Propose Feature</a>
    <br />
    <br />
    <a href="https://github.com/screeps/screeps">Screeps</a>
    ·
    <a href="https://github.com/screepers/screeps-launcher">Screeps Launcher</a>
    <br />
    <br />
    <a href="https://stats.deeptrain.net/">
        <img src="https://stats.deeptrain.net/repo/arcadia-screeps/deploy-wizard" alt="Stat"/>
    </a>
</p>




## Table of Contents

- [Description](#Description)
- [Compatibility](#Compatibility)
- [Environment](#Environment)
- [Installation](#Installation)
- [Usage](#Usage)
  - [Primary Preset](#Primary-Preset)
  - [Advanced Preset](#Advanced-Preset)
  - [Config Steam API Key](#Config-Steam-API-Key)
- [CLI Configuration](#CLI-Configuration)
  - [Language](#Language)
- [Build](#Build)
- [FAQs](#FAQs)
- [Compare](#Compare)
  - [screeps](#screeps)
  - [screeps-launcher](#screeps-launcher)
  - [screeps-deploy-wizard(This Project)](#This-Project)



## Description

A CLI for screeps server based on screep-launcher. Used for generating the `config.yaml` required by screeps-launcher, as well as providing some other utility features.

This CLI provides two preset startup modes:

1. Bare-metal startup. Disables screepsmod-mongo.
2. Docker startup. Enforces the use of screepsmod-mongo.

| Startup Mode | 不安装 mongo mod                                         | 安装 mongo mod                                               |
| ------------ | -------------------------------------------------------- | ------------------------------------------------------------ |
| Bare-metal   | Startup directly using screeps-launcher (primary preset) | Requires manual installation of mongo and redis on bare metal and manual management (not recommended). |
| Docker       | Using storage based on the LokiJS library                | Service automated management (advanced preset).              |

:bulb:Based on screeps-launcher, `screepsmod-admin-util` must be installed to allow parsing of the `server-config` section in `config.yaml`. 

<p align="right">[<a href="#Table of contents">↑ back to top</a>]</p>

## Compatibility

This CLI is compatible for the following platforms:

- Windows
- Linux

:bulb: Mac platform has not been tested.



## Environment

* Node.js 16 LTS or higher version
* Docker (if using advanced presets)

<p align="right">[<a href="#Table of contents">↑ back to top</a>]</p>

## Installation

### Source Code

Download the latest release package from the [Releases](https://github.com/arcadia-screeps/deploy-wizard/releases/) page of this project's GitHub repository.

To build from source code, refer to the [Build](https://chatnio.net/#Build) section.

### NPM

Pull from NPM:

```sh
npm i -g @arcadia-screeps/deploy-wizard

# or

yarn global add @arcadia-screeps/deploy-wizard
```

<p align="right">[<a href="# Table of contents">↑ back to top</a>]</p>

## Usage

View the help information

```sh
screeps-deploy-wizard
screeps-deploy-wizard --help

# or use the abbreviation

sdw
sdw --help
```

<p align="right">[<a href="# Table of contents">↑ back to top</a>]</p>

### Primary Preset

Initialize and generate `config.yaml` for launching with screeps-launcher.

```sh
sdw init
```

Follow the interactive command line and select the `Primary` preset.

<p align="right">[<a href="# Table of contents">↑ back to top</a>]</p>

### Advanced Preset

Initialize and generate `config.yaml` and `docker-compose.yaml` for starting up docker service

```sh
sdw init
```

Follow the interactive command line and select the `Advanced` preset.



Use Docker to start the service defined in `docker-compose.yaml`.

```sh
sdw start
```



The `screeps-server` container uses the `screeps-launcher` image. When the container starts, it will parse the `config.yaml`, install the runtime environment and specified mods, and finally start the Screeps server. This process may take a while. Please check the container logs to confirm the progress.

Output logs of  screeps-server container

```sh
sdw logs
```

Wait for the logs to stop scrolling and output similar information as shown below. This indicates that the Screeps server has started successfully, and players can connect to it using the Steam client.

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



Access the address `http://localhost:21025/web/` in your browser. Run a command on host to verify if the Screeps server is responding correctly:

```sh
curl http://localhost:21025/web/
```

:bulb: Please note that when accessing it from the command line, you must include the `/web/` slash. (This website is provided by `screepsmod-admin-utils-ui`).



****

To initialize the database or clear all user data, first connect to the CLI of `screeps-launcher`:

```sh
sdw	cli

# Equivalent to executing the command `screeps-launcher cli` inside the screeps-server container.

docker exec -ti screeps-server screeps-launcher cli
```

:warning:Note: It is necessary to include the `-ti` option, otherwise it may display error messages: `panic: no such device or address`

Then run command in CLI:

```sh
system.resetAllData()
```

finally exit CLI using `Ctrl-d`. It is best to restart the container.：

```sh
sdw restart
```



****

If you want to terminate the service, execute the following command to exit and remove all containers related to the service.

```sh
sdw stop
```

<p align="right">[<a href="# Table of contents">↑ back to top</a>]</p>

### Config Steam API Key

Starting Screeps server requires your Steam API Key. Screeps-launcher provides two methods for configuration.

1. config in `config.yaml` file

   ```yaml
   # config.yaml
   steamKey: # your Steam API Key
   ```

2. Store Steam API Key in a separate file and specify the file path in `config.yaml`.

   ```yaml
   # config.yaml
   steamKeyFile: "STEAM_KEY" # Default
   ```

   and then create `STEAM_KEY` file

   ```sh
   echo "replace your Steam API Key here" > STEAM_KEY
   ```

   your directory structure should look like this:

   ```sh
   .
   ├── config.yml
   ├── docker-compose.yml (高级预设)
   └── STEAM_KEY
   ```


:warning: If the STEAM_KEY file is configured but not placed, the screeps-launcher container will keep restarting.

<p align="right">[<a href="# Table of contents">↑ back to top</a>]</p>

## CLI Configuration

You can configure this CLI in two ways:

1. Use `sdw config` command to manage all configuration options.
2. Modify the configuration file directly.



Path for configuration file：

*  Linux and Mac：`$HOME/.screep-deploy-wizard/config.json`

*  Windows：`$HOME\.screep-deploy-wizard\config.json`



### Language

This CLI supports both English and Chinese languages. You can use the `language` configuration option to switch between languages.

```sh
# English
sdw config set language en

# Chinese
sdw config set language zh
```

<p align="right">[<a href="# Table of contents">↑ back to top</a>]</p>

## Build

After pulling the project to local, you need to build it before you can use it. First, cd into project root using `cd deploy-wizard`, and then execute the following command:

```sh
npm build

# or

yarn build
```



If you want to use the command in any directory, you need to add it globally

```sh
npm link
```

<p align="right">[<a href="# Table of contents">↑ back to top</a>]</p>

## FAQs

### Why does the server take a long time to respond when it is first started?

Because the `screeps-launcher` container will pull the `screeps`, `mod`, and other Node.js dependencies based on the configuration. This process can take some time to complete.



### Why there is no need to wait when the server restarts or stops and then starts again.

Because the server container is configured with a volume. This volume stores the runtime dependencies and configuration files, so the `screeps-launcher` does not need to pull dependencies again and can start directly.

<p align="right">[<a href="# Table of contents">↑ back to top</a>]</p>

### How to access Dashboard

After enabling `screepsmod-admin-util`, it provides a web-based dashboard for the server, which can be accessed in a browser by visiting `http://{{Your server ip}}:21025`.

The webpage includes a dashboard with the following information:

- Tick Rate variation
- Current Tick of the server
- Active users
- Total number of Creeps
- Rooms occupied by players
- Rooms active with player activity

And a LeaderBoard to view the player rankings for the following resources separately:

* GCL
* Power
* Rooms
* RCL

<p align="right">[<a href="# Table of contents">↑ back to top</a>]</p>

### How to modify the server configuration during runtime

When most of the configurations within the `serverConfig` section of the `config.yml` file are modified, they are instantly reloaded into the server.

:bulb: For specific configuration options, please refer to the [screeps-launcher](https://chatnio.net/#screeps-launcher) chapter and the detailed documentation of each mod.

You can modify the `config.yml` file without entering the container. By inspecting the generated `docker-compose.yml`, you can see that the `config.yml` file is mounted into the container as a bind mount. Therefore, you can directly modify the `config.yml` file on the host machine, and these changes will be synchronized to the container.

For example, if you change `serverConfig.tickRate` from 1000 to 2000 and then check the Web Dashboard, you will see that the server's Tick Rate has increased.

<p align="right">[<a href="# Table of contents">↑ back to top</a>]</p>

### How to list volumes and inspect mount point

**List volumes**

If not modified, the default volume names are:

* `screeps_server-data`：volume for screeps-launcher container，default mounting to `/screeps` dir
* `screeps_mongo-data`：volume for mongo
* `screeps_redis-data`：volume for redis



Execute command to list all volumes:

```sh
docker volume ls | grep "screeps"
```



****

**Inspect mount point**

Take `screeps_server-data` volume as example, inspect the detailed information of volume:

```sh
docker volume inspect screeps_server-data
```

The output result look like this:

```json
{
    	//...
        "Mountpoint": "/var/lib/docker/volumes/screeps_server-data/_data",
	    //...
}
```



cd into mount point and look around:

```sh
cd /var/lib/docker/volumes/screeps_server-data/_data
```



or execute the following quick command:

```sh
cd $(docker volume inspect screeps_server-data | jq '.[0].Mountpoint' | sed 's|\"||g')
```

<p align="right">[<a href="# Table of contents">↑ back to top</a>]</p>

### Why get stuck on title screen when starting up Stream client

Reason：Screeps is updating its `package.nw` file.

Solution: Manually download the latest version of the file and replace it.

- Right-click on the game in the Steam library - Manage - Browse Local Files, open Screeps worlds in the file manager. You will find a `package.nw` file and a `package.nw.new` file that is currently downloading the latest version.
- Visit the [official website](https://screeps.com/api/version) to check the latest version, and examine the `package` field. The current latest version is `224`.
- Concatenate the version number into the download link: `https://screeps.com/packages/224`, access the link to download the file, and the file name will default to the version number.
- Rename the file to `package.nw` and replace it in the game directory.

Reference post：[screeps world卡在nw.js界面](https://blog.csdn.net/weixin_44083915/article/details/134097416)

<p align="right">[<a href="# Table of contents">↑ back to top</a>]</p>



## Compare

### screeps

Description of official project [screeps](https://github.com/screeps/screeps)

>This project is a distributed, standalone game server that allows you to launch your own game world on a local computer or dedicated server on the Internet.
>

Screeps provides an official npm package. However, the project has not been updated for a long time, and the latest version [Release v3.4.0](https://github.com/screeps/screeps/releases/tag/v3.4.0) was released in 2019. The required environment for installation and runtime are very outdated, including nodegyp and python2. The best practise is install the screeps package on the node:10 environment on Ubuntu.

```sh
# Input Steam API Key
npx screeps init

# Start server
npx screeps start

# Connect to CLI of screeps server. Must start the server first
npx screeps cli
>> help() # use help() to check available commands
```



For the sake of not disrupting the server environment, it is best to package it into an image and run it. Below is an unofficial Dockerfile.

```dockerfile
ARG STEAM_API_KEY

# Staged build image
# BUILDER stage use ubuntu image to install node package
FROM ubuntu:16.04 AS BUILDER

# Change source if neccessary, and download environment
RUN sed -i 's@//.*archive.ubuntu.com@//mirrors.ustc.edu.cn@g' /etc/apt/sources.list  && \
    apt update && \
    apt install -y build-essential tcl git curl gcc g++ make

# Install node:10.x
RUN curl -sL https://deb.nodesource.com/setup_10.x | bash - && \
    apt install -y nodejs

# Install yarn
RUN curl -sL https://dl.yarnpkg.com/debian/pubkey.gpg | gpg --dearmor | tee /usr/share/keyrings/yarnkey.gpg >/dev/null && \
    echo "deb [signed-by=/usr/share/keyrings/yarnkey.gpg] https://dl.yarnpkg.com/debian stable main" | tee /etc/apt/sources.list.d/yarn.list && \
    apt-get update && apt-get install -y yarn

# Create and switch working dir
WORKDIR /screeps

# yarn change source and download mod and screeps server package
RUN yarn config set registry https://registry.npmmirror.com && \
    yarn add \
        screepsmod-admin-utils  \
        screepsmod-mongo  \
        screepsmod-auth  \
        screepsmod-features \
        screeps

FROM node:10.24-slim AS base-server
ARG STEAM_API_KEY
# Running with screeps user instead of root
RUN groupadd --gid 1000 screeps \
  && useradd --uid 1000 --gid screeps --shell /bin/bash --create-home screeps \
  && mkdir /screeps && chown screeps.screeps /screeps
USER screeps
# Expose /screeps volume
VOLUME /screeps
WORKDIR /screeps

# Copy node_modules, package.json, yarn.lock from BUILDER stage
COPY --from=BUILDER /screeps/ ./
# Override default screep configuration
COPY ./mods.json ./.screepsrc ./
# Initial with STEAM_API_KEY parameter
RUN sh -c '/bin/echo "${STEAM_API_KEY}" | npx screeps init'
ENTRYPOINT ["npx", "screeps", "start"]
```



:bulb: Instructions:

1. Create a new folder named `screeps-server` to store the `Dockerfile` and other files.

2. Create a file named `mods.json` with the following content:

   ```json
   {
       // List of enabled mods. It must be a subset of all installed mods
       "mods": [
           "node_modules/screepsmod-mongo/index.js",
           "node_modules/screepsmod-auth/index.js",
   	    "node_modules/screepsmod-tickrate/index.js",
       	"node_modules/screepsmod-admin-utils/index.js",
       	"node_modules/screepsmod-features/index.js"
       ],
       
       // scripts for npc bot
       "bots": {
           "simplebot": "node_modules/@screeps/simplebot/src"
       }
   }
   ```

3. Create a  `.screepsrc` file in INI format. When using `screeps start [option]` command to start, all options will be automatically saved to this file, so you can also directly modify the `.screepsrc` file to specify the server startup options.

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

4. Use the following command to build image:

   ```sh 
   docker build \
   	--network host \ # 指定 host 网络，以安装环境依赖
   	--build-arg STEAM_API_KEY="" \ # 指定服务器使用的 STEAM_API_KEY
   	-f ./dockerfile \ # 指定 dockerfile 路径
   	-t screeps-server:latest \ # 指定镜像名 
   	.
   ```

5. Use the following command to run container:

   ```sh
   docker run \
   	-d \ # 以后台模式运行，避免关闭终端后容器立刻终止
   	--name screeps-server \ # 指定容器名
   	-v screeps-server:/screeps \ # 使用卷标，由 docker 自动创建卷
   	-p 21025:21025 \ # 暴露 21025 接口，以便容器可以向外提供服务
   	screeps-server:latest
   ```

<p align="right">[<a href="# Table of contents">↑ back to top</a>]</p>

### screeps-launcher

screeps-launcher use `config.yaml`（or `config.yml`）as configuration file. The following configuration options and their default values are obtained from the screeps-launcher source code.

```yml
# config.yaml
steamKey: # your Steam API key
steamKeyFile: "STEAM_KEY" # Path to Steam API key file
cli: # screeps-launcher CLI configuration. Default to screeps cli
  host: "127.0.0.1"
  port: 21026
  username: ""
  password: ""
env: # Environment variable configuration. Will be applied to screeps server and mods
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
processors: # Default to runtime.NumCPU()
runnerthreads: # Default to math.Max(1, float64(processors)-1)
version: "latest" # Specified screeps version. Default to latest
nodeVersion: "Erbium" # Specified Nodejs version. Default to Erbium
mods: # mod config list
bots: # bot config list
extraPackages:
pinnedPackages:
    ssri: "8.0.1",
    cacache: "15.3.0",
    passport-steam: "1.0.17",
    minipass-fetch: "2.1.2",
    express-rate-limit: "6.7.0",
localMods: "./mods" # Directory of local mod
backup: # 配置备份
  dirs: # 备份目录列表
  files: # 备份文件列表
modules: # modules used by screeps server, check https://github.com/screeps/screeps?tab=readme-ov-file#modules
  backend: true
  main: true
  processor: true
  runner: true
  storage: true
```



****

If installed [screepsmod-admin-utils](https://github.com/ScreepsMods/screepsmod-admin-utils), you can add a section named `serverConfig` to the `config.yaml` file. The recognized fields and their default values for `screepsmod-admin-utils` are as follows:

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
  shardName: 'screepsplus1' # Default to hostname of host
  constants:
  	# Default 1000000
  	GCL_MULTIPLY:
  	# Default 2.4
  	GCL_POW: 
    UPGRADE_POWER: 10
    POWER_CREEP_SPAWN_COOLDOWN: 3600000 # 1 Hour
    POWER_CREEP_DELETE_COOLDOWN: 3600000
  welcomeText: |
    <h1>Welcome</h1>
    <div>Powered by screepsmod-admin-utils</div>
  statsToken: ...splusToken... # This enables submitting stats to S+ Grafana. Note: shardName MUST be set
  # Default false
  gclToCPU: true
  # Default 300
  maxCPU: 100 
  # Default 20
  baseCPU: 20 
  # Default 10
  stepCPU: 10
```

:bulb: All fields above are optional

:bulb: To specify the `map` field,  [screepsmod-mongo](https://github.com/ScreepsMods/screepsmod-mongo) must be installed first.

- For valid `map` value, visit [maps.screepspl.us](https://maps.screepspl.us/), or execute `curl https://maps.screepspl.us/maps/index.json` for source data.
- Each map has its `ID` and optional `Width` and `Height`.
  - Specified map ID: screeps will import the corresponding map.
  - Set as `random` (or `random_WxH`, e.g `random_1x2`): screeps will import a random map (or a random map with the specified width and height).

:bulb: After staring up the server, modifying the values of the `serverConfig` field will be reloaded into the server.



****

Any configurations written in the `serverConfig` section will override the configurations used by Screeps in the `.screepsrc` file. Here's an example of the same configurations in the `.screepsrc` and `screepsmod-mongo`:

* in `.screepsrc`:

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

* in `config.yaml`:

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

:bulb: Specific principle: `ini` files and `yaml` files are both in key-value pair format, and thus can be converted to each other. In an `ini` file, square brackets `[]` are used to indicate a section, which can contain any number of key-value pairs, corresponding to a nested object in `yaml`, for example: the section `[mongo]` corresponds to the `serverConfig.mongo` object.

<p align="right">[<a href="# Table of contents">↑ back to top</a>]</p>

### This Project

This project is based on screeps-launcher, not aiming to develop a new launcher, but to provide two preset launch methods for players who want to set up a runnable screeps private server in a short time; and to provide some convenient CLI commands for users running services with docker.

Players need to first use `screeps-deploy-wizard init` or the abbreviation `sdw init`, and follow the interactive command line to configure some necessary options. The CLI will generate the necessary files for starting the screeps server based on the selected preset.

For players using the Primary preset, they can directly use the `config.yaml` generated by this CLI, refer to the instructions in [screeps-launcher/Usage](https://github.com/screepers/screeps-launcher?tab=readme-ov-file#usage), and use the `screeps-launcher` command to start the server. (You need to download a release from the [Releases](https://github.com/screepers/screeps-launcher/releases) page of screeps-launcher first)

For players using the Advanced preset, the screeps-server, mongo, and redis containers will run simultaneously, and docker compose will be used for unified management. Players can use the commands provided by `sdw` to simplify service management, or use docker commands for more fine-grained operations.

<p align="right">[<a href="# Table of contents">↑ back to top</a>]</p>

