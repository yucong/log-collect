package com.yucong.log.common.vo;

import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;

import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

/**
 * 表格数据结构VO
 * 
 * @author 喻聪
 *
 */
@Data
public class DataTableVO<T> {

	@ApiModelProperty(value = "分页信息")
    private Map<String,Object> page;
	
    private List<T> list = new LinkedList<T>();

    public DataTableVO() {
    }

    public DataTableVO(List<T> list) {
        this.list = list;
    }

    public DataTableVO(List<T> list, Map<String,Object> page) {
        this.list = list;
        this.page = page;
    }

    public DataTableVO(int pageSize, long allCount, int allPage, int currentPage, List<T> list) {
        Map<String,Object> page = new HashMap<String,Object>();
        page.put("page_size", pageSize);
        page.put("all_count", allCount);
        page.put("all_page", allPage);
        page.put("current_page", currentPage);
        this.page = page;
        this.list = list;
    }

    public Map<String,Object> build() {
        String dataKey = "list";
        return build(dataKey);
    }

    public Map<String,Object> build(String dataKey) {
        if (dataKey == null) {
            return null;
        }
        Map<String,Object> result = new HashMap<String,Object>();
        result.put(dataKey, this.getList());
        result.put("page", this.getPage());
        return result;
    }


}
