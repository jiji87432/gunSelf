/**
 * 初始化产品详情对话框
 */


var ProductInfoDlg = {
    productInfoData : {},
    validateFields:{
            productName:{
                     validators: {
                       notEmpty: {message:'产品名称不能为空'}
                     }
             },
            productPlace:{
                     validators: {
                       notEmpty: {message:'产地不能为空'}
                     }
             },
            productSpecs:{
                     validators: {
                       notEmpty: {message:'产品规格不能为空'}
                     }
             },
            productPrice:{
                     validators: {
                       notEmpty: {message:'价格(元)不能为空'}
                     }
             },
            productYear:{
                     validators: {
                       notEmpty: {message:'产品年份不能为空'}
                     }
             },
            stockNumber:{
                     validators: {
                       notEmpty: {message:'库存数不能为空'}
                     }
             },
            categoryNo:{
                     validators: {
                       notEmpty: {message:'产品类别不能为空'}
                     }
             },
            isDelete:{
                     validators: {
                       notEmpty: {message:'是否下架不能为空'}
                     }
             },
     }
};

/**
 * 清除数据
 */
ProductInfoDlg.clearData = function() {
    this.productInfoData = {};
}

/**
 * 设置对话框中的数据
 *
 * @param key 数据的名称
 * @param val 数据的具体值
 */
ProductInfoDlg.set = function(key, val) {
    this.productInfoData[key] = (typeof val == "undefined") ? $("#" + key).val() : val;
    return this;
}

/**
 * 设置对话框中的数据
 *
 * @param key 数据的名称
 * @param val 数据的具体值
 */
ProductInfoDlg.get = function(key) {
    return $("#" + key).val();
}

/**
 * 关闭此对话框
 */
ProductInfoDlg.close = function() {
    parent.layer.close(window.parent.Product.layerIndex);
}

/**
 * 收集数据
 */
ProductInfoDlg.collectData = function() {
    this
    .set('productNo')
    .set('productName')
    .set('productPlace')
    .set('productSpecs')
    .set('productPrice')
    .set('productYear')
    .set('stockNumber')
    .set('categoryNo')
    .set('isDelete');
}


 /**
  * 验证数据是否为空
  */
 ProductInfoDlg.validate = function () {
     $('#productInfoForm').data("bootstrapValidator").resetForm();
     $('#productInfoForm').bootstrapValidator('validate');
     return $("#productInfoForm").data('bootstrapValidator').isValid();
 }


/**
 * 提交添加
 */
ProductInfoDlg.addSubmit = function() {

    this.clearData();
    this.collectData();
       if (!this.validate()) {
               return;
               }


    //提交信息
    var ajax = new $ax(Feng.ctxPath + "/product/add", function(data){
        Feng.success("添加成功!");
        window.parent.Product.table.refresh();
        ProductInfoDlg.close();
    },function(data){
        Feng.error("添加失败!" + data.responseJSON.message + "!");
    });
    ajax.set(this.productInfoData);
    ajax.start();
}

/**
 * 提交修改
 */
ProductInfoDlg.editSubmit = function() {

    this.clearData();
    this.collectData();

    //提交信息
    var ajax = new $ax(Feng.ctxPath + "/product/update", function(data){
        Feng.success("修改成功!");
        window.parent.Product.table.refresh();
        ProductInfoDlg.close();
    },function(data){
        Feng.error("修改失败!" + data.responseJSON.message + "!");
    });
    ajax.set(this.productInfoData);
    ajax.start();
}

$(function() {
 Feng.initValidator("productInfoForm", ProductInfoDlg.validateFields)

});
