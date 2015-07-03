#ClickEdge2SwitchWorkspace

A gnome-shell extension

Click at the left and right edges of the screen to switch around desktops(workspaces).

此扩展模仿compiz(gnome2)中可以设置的一个功能,点击屏幕的左右边界,可以切换向左(上)和向右(下)切换工作区(左边点左键是向左切换,右边点右键是向右切换,反之相反),并且是循环切换(最左边向作切换是右边).

Forked from Desktop Scroller
##Update History

V1: 目前还没有实现右键,左右边都是用左键点击.
V2: 1.修改使用button_press事件而不是clicked事件,现在可以响应右键点击 2.取消popupmenu显示,加快切换 速度 3.微调响应区大小和位置,减少误操作
V3: 1.修复左右代码反了的混乱情况 2.关闭右边的左键响应以防止误操作 3.修复开启出错的bug
V4: 支持gnome-shell 3.8/3.12/3.14/3.16

##Usage

Run install.sh to install, and enable it in gnome-tweak-tool.

执行install.sh 安装 然后在"高级设置工具"中启用

