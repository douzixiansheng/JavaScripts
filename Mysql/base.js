/**
 * mysql utf-8 和 utf8mb4的区别
 * mb4 就是 most bytes 4;专门用来兼容四字节的unicode
 * utf8mb4是utf8的超级
 * mysql支持的utf8编码最大字符长度为3字节(Unicode中的基本多文本平面)，如果遇到4字节的宽字符就会插入异常
 * 3个字节的utf-8最大能编码的Unicode字符是0xFFFF,也就是Unicode中的基本多文本平面(BMP);任何不在基本多文
 * 本平面的Unicode字符，都无法使用Mysql的utf8字符集存储(Emoji表情，不常用的汉子，任何新增的Unicode字符)
 */