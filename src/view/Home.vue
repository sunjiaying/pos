<template>
  <div id="app">
    <van-nav-bar
      title="首页"
    />

    <promotion-rule ref="rule" @ruleloaded = "ruleloaded" />

    <van-cell-group>
      <!-- <van-cell>
        <template slot="title">
          <van-button round size="small" text="unloadjs" @click="unloadjs" />
          <van-button round size="small" text="calc" @click="calc" />
        </template>
      </van-cell> -->
      <van-cell>
        <template slot="title">
          <van-button type="primary" size="small" text="扫码" @click="add" />
          <van-button size="small" text="VIP" />
          <van-button type="warning" size="small" text="券" />
          <van-button type="danger" size="small" text="促销活动" @click="showrules" />      
        </template>
      </van-cell>
      <van-cell>
        <template slot="title">
          <van-tag plain type="success">应付金额:{{getFpriceTotal(bill)}}</van-tag>
          <van-tag plain type="primary">可返积分:{{getPointTotal(bill)}}</van-tag>
          <van-tag v-if="bill.rule" mark type="danger">{{bill.rule.name}}</van-tag>
        </template>
      </van-cell>
    </van-cell-group>

    <van-list>
      <van-swipe-cell :right-width="65" v-for="(item, index) in bill.items" :key="item.matcode">
        <van-cell-group>
          <van-cell >
            <div style="height:82px;">
              <img style="position: absolute;left: 0px;" src='http://temp.im/80x80/9f90bf/fff'>
              <span style="position: absolute;left: 100px;" class="custom-text">{{item.matcode}}</span>
              <van-tag style="position: absolute;left: 100px;top:25px;" color="#f2826a" round>吊牌价:{{item.tprice}}</van-tag>
              <span style="position: absolute;right: 8px;top: 5px;font-size:8pt;color:#bbb">应收</span>
              <span style="position: absolute;right: 5px;top: 25px;font-size:18pt;">{{item.fprice}}</span>
            </div>
          </van-cell>
        </van-cell-group>
        <span slot="right">
          <van-button type="danger" style="height:100%;" @click="remove(index)">移除</van-button>
        </span>
      </van-swipe-cell>      
    </van-list>

    <van-popup v-model="ruleshow" position="bottom" :overlay="true" >
      <div style="padding-left:10px;padding-top:10px;padding-right:10px;padding-bottom:10px;overflow-x:auto;">
        <span v-for="rule in rules" v-bind:key="rule.name">
          <van-button v-if="rule.type===1" style="margin:5px;" round type="primary" size="small" :text="rule.name" @click="loadjs(rule)" />
          <van-button v-if="rule.type===0" style="margin:5px;min-width: 40px;" round size="small" :text="rule.name" @click="loadjs(rule)" />
        </span>
      </div>
    </van-popup>

  </div>
</template>

<script>
import { Popup, SwipeCell, Tag, List, Cell, CellGroup, NavBar, Panel, Row, Col, Icon, Button } from 'vant';
import PromotionRule from '../component/promotionrule';

export default {
  components: {
    [PromotionRule.name]: PromotionRule,
    [SwipeCell.name]: SwipeCell,
    [Popup.name]: Popup,
    [Tag.name]: Tag,
    [List.name]: List,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [NavBar.name]: NavBar,
    [Button.name]: Button,
    [Panel.name]: Panel,
    [Row.name]: Row,
    [Col.name]: Col,
    [Icon.name]: Icon
  },
  mounted() {
  },
  data() {
    return {
      // baseurl: 'https://marisfrolg.nos-eastchina1.126.net/UPDATE/js/',
      baseurl: 'http://127.0.0.1:8000/',
      ruleshow: false,
      rules: [
        { 'type': 0, 'name': '无', 'jsurl': 'rule0.js' },
        { 'type': 1, 'name': '整单8折', 'jsurl': 'rule1.js' },
        { 'type': 1, 'name': '满5000送A1143001102', 'jsurl': 'rule2.js' },
        { 'type': 1, 'name': '满5000送A1143001102(2)', 'jsurl': 'rule2.js' },
        { 'type': 1, 'name': '满5000送A1143001102(3)', 'jsurl': 'rule2.js' }
      ],
      bill: {
        'name': 'sunjiaying',
        'rule': null,
        'vip': null,
        'coupons': [],
        'items': [
          {
            'matcode': 'A1143001102', // 款号
            'tprice': 2680, // 吊牌价
            'fprice': 2680, // 应收款
            'point': 2680 / 20 // 可反积分
          }
        ]
      }
    };
  },
  methods: {
    add() {
      var it = {};
      it.matcode = 'A' + Math.floor(Math.random() * 10000000) + '02';
      it.tprice = 1980;
      it.fprice = 1980;
      it.point = 1980 / 20;
      this.bill.items.push(it);

      this.calc();
    },
    remove(index) {
      this.bill.items.splice(index, 1);

      this.calc();
    },
    showrules() {
      this.$refs.rule.unload();
      this.ruleshow = true;
    },
    loadjs(rule) {
      this.$refs.rule.loadjs(this.baseurl + rule.jsurl + '?v=' + Math.random());
      this.bill.rule = rule;
      this.ruleshow = false;
      if (rule.type === 0) {
        this.bill.rule = null;
      }
    },
    unloadjs() {
      this.$refs.rule.unload();
    },
    ruleloaded() {
      // console.log('ruleloaded');
      var _this = this;
      this.sleep(500).then(function() {
        _this.calc();
      });
    },
    calc() {
      var r = this.$refs.rule.calc(this.bill);
      console.log(r);
    },
    getPointTotal(bill) {
      var point = 0;
      bill.items.forEach(item => {
        point = point + item.point;
      });
      return point;
    },
    getFpriceTotal(bill) {
      var fprice = 0;
      bill.items.forEach(item => {
        fprice = fprice + item.fprice;
      });
      return fprice;
    }
  }
};
</script>

<style>
.row1 .van-col {
  padding: 10px;
}
</style>
