<template >
    <view-box v-ref:view-box class="registerInfo">
        <div slot="header" style="position:absolute;left:0;top:0;width:100%;z-index:100">
            <x-header :left-options="{showBack: false}">
                资料填写
            </x-header>
        </div>
        <div style="padding-top:46px;">
            <div class="icon">
                <img src="../../assets/login/icon.jpg">
            </div>
            <div class="title">
                <img src="../../assets/login/title.png">
            </div>

            <group title="基本资料">
                <x-input title="姓名" name="username" :value.sync="username" v-ref:username is-type="china-name"></x-input>
                <!-- <popup-picker title="年级" :data="gradeList"  :value.sync="grade"></popup-picker> -->
                <x-input title="学校" name="school" :value.sync="school" v-ref:school ></x-input>
            </group>

            <group title="学科选择">
                <!-- <popup-picker title="学科" :data="subjectList"  :value.sync="subject"></popup-picker> -->
                <mt-picker :slots="addressSlots" @change="onAddressChange" :visible-item-count="3"></mt-picker>

            </group>
            <div style="width:90%;margin:1rem auto;">
                <x-button type="primary" @click="_complete" :disabled="disable">下一步</x-button>
            </div>
        </div>
    </view-box>
</template>

<script>
import Vue from 'vue'
import Router from 'vue-router'
import store from '../../store'
import { registerMobile } from '../getters'
import { Picker } from 'mint-ui';
import { XHeader,Panel,ViewBox,Flexbox,FlexboxItem,XButton,XInput,Group,Cell,Confirm,PopupPicker} from 'vux'
import '../main.less'

const material = {
    '七年级':{'物理':['人教a'],'数学':['人教a','人教b']},
    '八年级':{'物理':['人教c'],'数学':['人教a'],'化学':['人教x']},
    '九年级':{'物理':['人教a']},
}

export default {
    components: {
        XHeader,ViewBox,Panel,Flexbox,FlexboxItem,XButton,XInput,Group,Cell,Confirm,PopupPicker,
        'mt-picker':Picker
    },
    methods: {
        _complete(){
            let grade;
            if(this.grade == '七年级'){
                grade = 7;
            }
            else if(this.grade == '八年级'){
                grade = 8;
            }
            else if(this.grade == '九年级'){
                grade = 9;
            }else{
                grade = 0;
            }
            console.log(this.username+"\n");
            console.log(this.school+"\n");
            console.log(this.physics+"\n");
            console.log(this.math+"\n");
            console.log(grade+"\n");
            this.$router.replace('password');
        },
        onAddressChange(picker, values) {
            picker.setSlotValues(1, Object.keys(material[values[0]]));
            picker.setSlotValues(2,material[values[0]][values[1]]);
        }
    },
    vuex: {
        getters: {
            registerMobile
        },
        actions: {

        }
    },
    store,
    data() {
        return {
            username:'',
            school:'',
            disable: true,
            math:['人教版'],
            mathList: [
                ['人教版']
            ],
            subject:['数学'],
            subjectList: [
                ['数学','物理','化学']
            ],
            grade:['七年级'],
            gradeList: [
                ['七年级', '八年级', '九年级','高中']
            ],
            addressSlots: [
                {
                    flex: 1,
                    values: Object.keys(material),
                    className: 'slot1',
                    textAlign: 'center'
                }, {
                    flex: 1,
                    values: ['数学','物理','化学'],
                    className: 'slot2',
                    textAlign: 'center'
                }, {
                    flex: 1,
                    values: ['人教a','人教b'],
                    className: 'slot3',
                    textAlign: 'center'
                }
            ]
        }
    },
    computed:{
        disable(){
            return (this.$refs.username.valid && this.$refs.school.valid ? false : true);
        }
    }
}
</script>
