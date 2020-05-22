
# 运行环境：

- RabbitMQ  用来收集日志，其他平台产生的日志需要生产到队列中；
- MongoDB   队列中的日志消息消费后，保存到Mongo中，通过接口实现日志的查询；

# 部署运行本项目，必须要做的几件事：

- 在application-test.yml中需要声明mongo和rabbitMQ的配置

- 成功运行项目后，可通过swagger管理界面查看API接口：
- http://localhost:9002/log/swagger-ui.html


# 两个小问题：

- 1 如何上生产，关闭swagger

- 2 通过命令行参数指定运行环境
java -jar xxx.jar --spring.profiles.active=test
