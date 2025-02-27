// 表单提交事件
document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault(); // 阻止表单默认提交行为

    // 获取表单数据
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    // 简单验证
    if (name && email && message) {
        alert('感谢您的留言！我们会尽快联系您。');
        document.getElementById('contactForm').reset(); // 清空表单
    } else {
        alert('请填写所有字段。');
    }
});