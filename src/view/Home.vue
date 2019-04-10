<template>
  <div id="app">
    <van-nav-bar
      title="首页"
    />

    <promotion-rule ref="rule" @ruleloaded = "ruleloaded" />

    <van-cell-group>
      <!-- <van-cell>
        <template slot="title">
          <van-button round size="small" text="选择促销活动" @click="showrules" />
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
          <van-tag v-if="bill.rule" mark type="danger">{{bill.rule.name}}</van-tag>
        </template>
      </van-cell>
    </van-cell-group>

    <van-list>
      <van-cell v-for="item in bill.items"
        :key="item.matcode" :value="item.fprice">
        <template slot="title">
          <span class="custom-text">{{item.matcode}}</span>
          <van-tag color="#f2826a" round>{{item.tprice}}</van-tag>
        </template>
      </van-cell>
    </van-list>

    <van-popup v-model="ruleshow" position="bottom" :overlay="true" >
      <div style="padding-left:10px;padding-top:10px;padding-right:10px;padding-bottom:10px;overflow-x:auto;">
        <span style="margin-right:5px;" v-for="rule in rules" v-bind:key="rule.name">
          <van-button v-if="rule.type===1" round type="primary" size="small" :text="rule.name" @click="loadjs(rule)" />
          <van-button v-if="rule.type===0" style="min-width: 40px;" round size="small" :text="rule.name" @click="loadjs(rule)" />
        </span>
      </div>
    </van-popup>

  </div>
</template>

<script>
import { Popup, Tag, List, Cell, CellGroup, NavBar, Panel, Row, Col, Icon, Button } from 'vant';
import PromotionRule from '../component/promotionrule';

export default {
  components: {
    [PromotionRule.name]: PromotionRule,
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
      ruleshow: false,
      rules: [
        { 'type': 0, 'name': '无', 'jsurl': 'https://marisfrolg.nos-eastchina1.126.net/UPDATE/js/rule0.js' },
        { 'type': 1, 'name': '促销活动1', 'jsurl': 'https://marisfrolg.nos-eastchina1.126.net/UPDATE/js/rule1.js' },
        { 'type': 1, 'name': '促销活动2', 'jsurl': 'https://marisfrolg.nos-eastchina1.126.net/UPDATE/js/rule2.js' }
      ],
      bill: {
        'name': 'sunjiaying',
        'rule': null,
        'vip': null,
        'coupons': [],
        'items': [
          { 'matcode': 'A1143001102', 'tprice': 2680, 'fprice': 2680 }
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
      this.bill.items.push(it);
    },
    showrules() {
      this.$refs.rule.unload();
      this.ruleshow = true;
    },
    loadjs(rule) {
      this.$refs.rule.loadjs(rule.jsurl + '?v=' + Math.random());
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
    }
  }
};
</script>

<style>
.row1 .van-col {
  padding: 10px;
}
</style>
