import $ from 'jquery'
export function asyncPost(url, data) {
    let reData='';
    $.ajax({
        url: process.env.BASE_API+url,//url路径
        type: 'POST', //GET
        async: false, //或false,是否异步
        data: data,
        timeout: 15000, //超时时间
        dataType: 'json',
        success: function(data,textStatus,jqXHR){
            reData= data;
        }
    });
    return reData.data;
}