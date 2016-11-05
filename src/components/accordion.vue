<template >
    <div class="container">
        <section class="ac-container">
            <div v-for="items in list" class="gnb-accordion">
                <input :id="'ac-'+$index" name="accordion-1" type="checkbox" :checked="$index == '0'" />
                <label class="sectionHeader" :for="'ac-'+$index">{{items.title}}<span class="with_arrow"></span></label>
                <article class="ac-small">
                    <group>
                        <cell v-for="item in items.list" :title="item.title" :link="link + item.id"></cell>
                    </group>
                </article>
            </div>
        </section>
    </div>
</template>

<script>
import {Cell, Group} from 'vux'
export default {
    name:'accordion',
    components:{
        Cell,Group
    },
    props: ['list','link']
}
</script>
<style lang="less" >
.ac-container{
    width: 100%;
    text-align: left;
}
.gnb-accordion{
    margin-top: 1rem;
}
.ac-container label{
    padding: 5px 20px;
    position: relative;
    z-index: 20;
    display: block;
    height: 30px;
    cursor: pointer;
    color: #777;
    line-height: 33px;
    font-size: 19px;
}
.ac-container label:hover{
    background: #fff;
}
.ac-container input:checked + label,
.ac-container input:checked + label:hover{
    background: #c6e1ec;
    color: #3d7489;
    .with_arrow{
        transform: rotate(315deg);
    }
}
.ac-container label:hover:after,
.ac-container input:checked + label:hover:after{
    content: '';
    position: absolute;
    width: 24px;
    height: 24px;
    right: 13px;
    top: 7px;
    // background: transparent url(../images/arrow_down.png) no-repeat center center;
}
.ac-container input{
    display: none;
}
.ac-container article{
    margin-top: -1px;
    overflow: hidden;
    height: 0px;
    position: relative;
    z-index: 10;
    -webkit-transition: height 0.3s ease-in-out;
    transition: height 0.3s ease-in-out;
}
.ac-container input:checked ~ article{
    -webkit-transition: height 0.5s ease-in-out;
    transition: height 0.5s ease-in-out;
}
.ac-container input:checked ~ article.ac-small{
    height: auto;
}

</style>
