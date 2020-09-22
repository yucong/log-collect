package com.java.common.log.producer;

import java.util.TimerTask;
import java.util.concurrent.ScheduledThreadPoolExecutor;
import java.util.concurrent.TimeUnit;

public class ThreadPoolManager {

	/**日志记录操作延时*/
    private final int OPERATE_DELAY_TIME = 10;

    /**异步操作记录日志的线程池*/
    private ScheduledThreadPoolExecutor executor = null;
    private static ThreadPoolManager instance = new ThreadPoolManager();
    
    private ThreadPoolManager() {
    	executor = new ScheduledThreadPoolExecutor(5);
    }
    
    public static ThreadPoolManager getInstance() {
    	return instance;
    }
    
    public void addTask(TimerTask task) {
    	executor.schedule(task, OPERATE_DELAY_TIME, TimeUnit.MILLISECONDS);
    }
    
    
    
    
    
    
    
	
	
}
