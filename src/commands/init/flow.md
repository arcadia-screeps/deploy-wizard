# init 指令

`init`交互如下：

* 输入 `steamKeyFile` 路径
* 输入 `tickRate`，单位毫秒。默认 `1000`。
* 选择预设：
  * 初级：裸机/docker启动，禁用 mongo mod。产物：`config.yaml`
  * 高级：docker-compose，必须启用 mongo mod。产物：`config.yaml`+`docker-compose.yaml`
* 询问需要安装哪些 mods
  * `screepsmod-mongo`：
    * 选择 mongo 镜像版本，默认 latest。可选 3.0.6
    * 选择 mongo 挂载卷标。默认 `mongo-data`
    * 选择 redis 版本。默认 latest。可选 2.6.4
    * 选择 redis 挂载卷标。默认 `redis-data`
    * 输入所用的网络名。默认 `host`
  * `screepsmod-auth`：
  * `screepsmod-admin-util`。必须启用
  * `screepsmod-admin-util-ui`
  * `screepsmod-map-tool`
    * 输入用户名，默认 `admin`
    * 输入密码
  * `screepsmod-pure-automation`
  * `screepsmod-stats`
  * `screepsmod-features`
  * `screepsmod-user-script-debug`
  * `screepsmod-remote-console`。自动选择 screepsmd-auth

* 如果高级预设且没有安装 docker-compose，

  * 询问是否自动安装 DockerCompose

  * 若是，选择安装版本






:bulb: 约束：
* 若启用 admin-utils-ui 可能需要另外启动容器
* 若启用 user-script-debut，则 .screepssrc 中的 runner_cnt 必须设置为 1
* remote-console 依赖于 auth
*
