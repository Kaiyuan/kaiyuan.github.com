# Air Play Box

HTML5 Music player

找到了一个 File Api 可以读取本地内容，所以有空研究到会继续填。

<del time="2013-04-10">这是一个坑，我不打算填了。</del>

使用 `localStorage` 浏览器本地储存JSON数据方式管理网络音乐。

初衷是想写一个播放器代替桌面播放器来管理和播放本地音乐文件，但是浏览器的安全设置导致不能直接播放本地文件，所以本来想做的拖放获取本地文件地址就没做了。

Add item
----

可以通过右上方的窗口添加歌曲的内容

可以直接通过 `additem(Name,URL,PhotoUrl)` 添加歌曲到列表，可以自己写脚本抓取网站上的歌曲添加到列表。其中 `URL` 不能为空！如果没有 `Name` 会自动获取 `URL` 中的文件名为歌曲名称。`PhotoUrl` 可以留空。

可以通过列表当中编辑按钮查看和修改相应内容，删除按钮直接可以删除相应歌曲。

The JSON

    {"musiclist":[
		{
			"mname":["Music Name"],
			"url":["http://.../....mp3"],
			"img":["http://.../....jpg"]
		},
		{
			"mname":["Music Name"],
			"url":["http://.../....mp3"],
			"img":["http://.../....jpg"]
		}
    ]}

License
----
Released under the MIT license.
