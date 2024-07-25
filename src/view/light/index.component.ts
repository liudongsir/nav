// Copyright @ 2018-present xiejiahe. All rights reserved. MIT license.
// See https://github.com/xjh22222228/nav

import { Component } from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router'
import { INavProps, INavThreeProp } from 'src/types'


import {
  fuzzySearch,
  randomBgImg,
  queryString,
  setWebsiteList,
  toggleCollapseAll,
  matchCurrentList,
  getOverIndex,
} from 'src/utils'
import { isLogin } from 'src/utils/user'
import { websiteList, settings } from 'src/store'

@Component({
  selector: 'app-light',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
})
export default class LightComponent {
  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}

  websiteList: INavProps[] = websiteList
  currentList: INavThreeProp[] = []
  id: number = 0
  page: number = 0
  isLogin = isLogin
  sliceMax = 1
  settings = settings
  overIndex = Number.MAX_SAFE_INTEGER
  searchKeyword = ''

  ngOnInit() {
    // randomBgImg()
    document.body.style.backgroundImage =  'url("assets/img/background.jpg")',
    document.body.style.backgroundAttachment='fixed',/*背景图片不会随着页面的滚动而滚动。*/
    document.body.style.backgroundRepeat='no-repeat',/*设置背景不重复*/
    document.body.style.backgroundSize='cover',/*	此时会保持图像的纵横比并将图像缩放成将完全覆盖背景定位区域的最小大小。*/

    this.activatedRoute.queryParams.subscribe(() => {
      const { id, page, q } = queryString()
      this.page = page
      this.id = id
      this.searchKeyword = q
      this.sliceMax = 1
      if (q) {
        this.currentList = fuzzySearch(this.websiteList, q)
      } else {
        this.currentList = matchCurrentList()
      }
      setTimeout(() => {
        this.sliceMax = Number.MAX_SAFE_INTEGER
      }, 100)
    })
  }

  trackByItem(a: any, item: any) {
    return item.title
  }

  trackByItemWeb(a: any, item: any) {
    return item.id
  }

  collapsed() {
    try {
      return !!websiteList[this.page].nav[this.id].collapsed
    } catch (error) {
      return false
    }
  }

  handleCilckTopNav(index: number) {
    const id = this.websiteList[index].id || 0
    this.router.navigate([this.router.url.split('?')[0]], {
      queryParams: {
        page: index,
        id,
        _: Date.now(),
      },
    })
  }

  handleSidebarNav(index: number) {
    const { page } = queryString()
    this.websiteList[page].id = index
    this.router.navigate([this.router.url.split('?')[0]], {
      queryParams: {
        page,
        id: index,
        _: Date.now(),
      },
    })
  }

  ngAfterViewInit() {
    if (this.settings.lightOverType === 'ellipsis') {
      queueMicrotask(() => {
        const overIndex = getOverIndex('.top-nav .over-item')
        if (this.overIndex === overIndex) {
          return
        }
        this.overIndex = overIndex
      })
    }
  }

  onCollapse = (item: any, index: number) => {
    item.collapsed = !item.collapsed
    this.websiteList[this.page].nav[this.id].nav[index] = item
    setWebsiteList(this.websiteList)
  }

  onCollapseAll = () => {
    toggleCollapseAll(this.websiteList)
  }
}
