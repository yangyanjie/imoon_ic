ios 项目打包：
1.生成bundle包，在根目录下执行该命令：
react-native bundle --entry-file index.js  --platform ios --dev false --bundle-output ./ios/bundle/index.jsbundle --assets-dest ./ios/bundle
注意： 该步骤比较慢，请各位大神耐心等待；
几分钟中后在ios 下生成了bundle 的包，包含我们的所有东西；
2.在ios中AppDelegate里可以看到设置JavaScript代码位置的代码；(ios/imoon_ic/AppDelegate.m)
删除下列代码：
jsCodeLocation = [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index" fallbackResource:nil];
替换：jsCodeLocation = [[NSBundle mainBundle] URLForResource:@"bundle/index" withExtension:@"jsbundle"];