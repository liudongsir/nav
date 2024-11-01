// 开源项目，未经作者同意，不得以抄袭/复制代码/修改源代码版权信息。
// Copyright @ 2018-present xiejiahe. All rights reserved.
// See https://github.com/xjh22222228/nav

import {Component} from '@angular/core'
import {randomBgImg} from 'src/utils'
import {CommonService} from 'src/services/common'
import {JumpService} from 'src/services/jump'

@Component({
  selector: 'app-light',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
})
export default class LightComponent {
  constructor(
    public commonService: CommonService,
    public jumpService: JumpService
  ) {
  }

  ngOnInit() {
    // randomBgImg()
    document.body.style.backgroundImage = 'url("assets/img/background.jpg")';
    document.body.style.backgroundAttachment = 'fixed';/*背景图片不会随着页面的滚动而滚动。*/
    document.body.style.backgroundRepeat = 'no-repeat';/*设置背景不重复*/
    document.body.style.backgroundSize = 'cover';/*	此时会保持图像的纵横比并将图像缩放成将完全覆盖背景定位区域的最小大小。*/

  }

  ngOnDestroy() {
    this.commonService.overIndex = Number.MAX_SAFE_INTEGER
  }

  ngAfterViewInit() {
    if (this.commonService.settings.lightOverType === 'ellipsis') {
      this.commonService.getOverIndex('.top-nav .over-item')
    }
  }
}
