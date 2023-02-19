<template>
  <div class="info-detail">
    <el-aside>
      <el-image :src="url" :preview-src-list="srcList" :initial-index="1" fit="cover"></el-image>
      <el-card class="box-card" shadow="never">
        <div class="text-item" v-for="info in simpleInfo" :key="info.id">
          {{ info.title + '：' + info.value }}
        </div>
      </el-card>
    </el-aside>
    <el-main>
      <div class="demo-collapse">
        <el-collapse v-model="activeNames">
          <el-collapse-item v-for="info in mainInfo" :key="info.id" :title="info.title">
            <div>{{ info.value }}</div>
          </el-collapse-item>
        </el-collapse>
      </div>
    </el-main>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive } from 'vue'
import {
  ElContainer,
  ElMain,
  ElCard,
  ElImage,
  ElAside,
  ElCollapse,
  ElCollapseItem
} from 'element-plus'
import { fruitInfoType } from './type'
import { fromatData } from '../hooks/formatData'
export default defineComponent({
  components: {
    ElContainer,
    ElMain,
    ElAside,
    ElImage,
    ElCard,
    ElCollapse,
    ElCollapseItem
  },
  setup() {
    const url = 'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg'
    // 图片详情
    const srcList = [
      'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg',
      'https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg',
      'https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg',
      'https://fuss10.elemecdn.com/9/bb/e27858e973f5d7d3904835f46abbdjpeg.jpeg',
      'https://fuss10.elemecdn.com/d/e6/c4d93a3805b3ce3f323f7974e6f78jpeg.jpeg',
      'https://fuss10.elemecdn.com/3/28/bbf893f792f03a54408b3b7a7ebf0jpeg.jpeg',
      'https://fuss10.elemecdn.com/2/11/6535bcfb26e4c79b48ddde44f4b6fjpeg.jpeg'
    ]

    // 内容详情
    let fruitInfoData = reactive<fruitInfoType>({
      id: 1,
      scientific_name: '黄河蜜',
      pinyin: 'Huang He Mi',
      english_name: 'Yellow River Honey',
      nick_name: '黄河蜜瓜',
      views: 521,
      update_time: '2021-01-09 21:01',
      essential_information:
        '黄河蜜一般指黄河蜜瓜。黄河蜜瓜是甘肃农业大学瓜类研究所用白兰瓜单株变异后代与墨西哥甜瓜品种甘露杂交选育而成的品种，属中早熟品种，主要分布区域为甘肃省民勤县收成乡。黄河蜜瓜生育期比白兰瓜早10天左右。果实圆形或长圆形，平均单瓜重2.16公斤。“黄河蜜”其名之意就是用黄河母亲的水浇灌而成的一种甜瓜，吃过的人会感到唇齿留香!',
      distribution_area: '甘肃为主产区',
      mature_period:
        '黄河蜜是什么季节的水果：黄河蜜属中早熟品种，是盛夏季节重要的水果之一。全生育期105-120天，座果后35-40天成熟，果实椭圆形，果皮光滑，未成熟时呈绿色，成熟后金黄色，有的有网纹，果肉淡绿色，肉厚3-4厘米，肉质坚硬，耐贮运。黄河蜜几月成熟：黄河蜜瓜多是在每年五月中下旬和六月上旬时成熟上市，因为它这种蜜瓜是在每年春季时进行种植，也就是在每年三月份的时候开始种下，全部生长期为一百一十天左右，它生成七十天左右开始结果，坐果后的四十天左右蜜瓜就会成熟。如果大家也想吃，可以在黄河蜜瓜大量上市的五月份去甘肃，肯定能大饱口福。',
      nutritive_value:
        '富含维生素c，维c具有保护牙齿健康，预防动脉硬化，清除自由基防癌，保护细胞、解毒，保护肝脏，提高免疫力、应急能力。',
      selection_method:
        '果柄：黄河蜜成熟时后端的果柄色泽鲜艳、花斑明显、表面坚韧、手感光滑。有部分品种的黄河蜜成熟到九成时，果柄处产生离层，容易自然脱落。味道：凡是具有散发香味特性的黄河蜜，如黄口奇、热瓜蛋、波斯特皮牙孜、老汉瓜等，成熟时果脐部会散发出浓烈的果香味。卷须：不论哪个品种的黄河蜜，成熟时瓜节位上的卷须都会明显枯黄，如果在瓜田挑瓜，根据瓜须节位上的叶子即可辨别瓜是否成熟。按压：不论哪种黄河蜜，成熟时顶端都会变软，用手轻轻地按压瓜的顶端，如果手感绵软，说明这个瓜成熟了。重量：水果的重量就是里面的糖和水分了。黄河蜜如果太重，那么很可能是生的;太轻了，又没有水分。大家在挑选的时候可以掂量一下，稍沉一些的黄河蜜，一般都会很甜的。',
      edible_method:
        '利尿止渴：黄河蜜中含有丰富的水分和维生素，食用黄河蜜，能够黄河蜜含有维生素，帮助消化、利尿，排除体内废物与毒素，润泽皮肤，淡化色素。缓解烦热、解暑：黄河蜜还有清凉消暑、除烦热、生津止渴的作用。催吐：现代医学研究发现，黄河蜜等甜瓜类的蒂含苦毒素，具有催吐的作用，能刺激胃壁的黏膜引起呕吐，适量的内服可急救食物中毒，而不会被胃肠吸收，是一种很好的催吐剂。治疗贫血：吃黄河蜜对人体造血功能有着显著的促进作用，因此黄河蜜还可以用来作为贫血的食疗之品。预防胎儿畸形：因为黄河蜜里面含有丰富的叶酸，所以对于孕妇和胎儿都是很有益的水果，能预防胎儿畸形。',
      saving_method:
        '贮前准备：首先准备贮藏的瓜，应是成熟度适中、个头大小相一致、新鲜没有腐烂、没有虫斑、在外表皮无损伤的瓜，采收应在早上露水干后或下午4点以后进行，采收时应戴上手套，轻拿轻放，防止损伤，离果柄(瓜把)至少2厘米用剪刀剪下，禁止裸露瓜肉。贮藏方法：将干净黄沙铺于空房、地窖、防空洞等空间较大的地方，然后铺5厘米的锯末，用碗拌少许锯末点燃每立方朱5～10克硫磺或用1%～2%的福尔马林喷洒，然后密闭24小时左右通风换气，待没有呛人的味道时，把待贮的瓜挨个放于铺好的锯末上，在瓜缝中填满湿黄沙(湿度以手握不结团为好)并超出瓜3～4厘米。',
      planting_method:
        '浇水追肥：早春棚室内栽培黄河蜜瓜，在定植时气温低，水分蒸发少，在浇过定植水后应注意保温，控制浇水。缓苗后分次中耕划锄，并喷天达2116壮苗灵600倍液，促进幼苗健壮生长。到伸蔓期，可结合浇水追施一次含氮量较高的三元素肥料，瓜的膨大期也可亩施硫酸钾10千克，磷酸二氢钾10-20千克或冲施流体肥料。生长期内也可叶面施肥0.2%磷酸二氢钾或光合微肥2-3次。黄河蜜瓜为忌氯作物，不应大量施用含氯，尤其是含双氯的复合肥料。整枝摘心吊蔓：黄河蜜瓜的分枝性很强，大多品种以子蔓和孙蔓结瓜为主，因此，一般在瓜苗长到4-5片真叶时进行摘心，促进侧枝生长。幼瓜坐住后，再对子蔓摘心，促进养分向幼瓜输送，促幼瓜膨大。黄河蜜瓜整枝方式，可根据不同品种的结瓜习性进行，一般棚室栽培的厚皮黄河蜜瓜多用单蔓或双蔓整枝。单蔓整枝是在主蔓4-5片真叶时摘心，在基部留一健壮子蔓，其余子蔓全部摘除。留子蔓第7-11节上长出的孙蔓结瓜后，瓜前留1-2片叶摘心。待子蔓生长到25-30叶时也摘心，不结瓜的孙蔓的全部摘除。人工授粉、吊瓜黄河蜜瓜为雌雄同株异花作物，大部分品种为雌雌雄两性花，以昆虫传粉为主。在早春气温低、昆虫少时，棚室内栽培的一般要进行人工授粉。在雌花开放后，当日气温升至20℃前，选当天新开的雄花取下，剥去花瓣，将雄蕊往雌花的柱头上轻轻涂抹。授粉后挂牌标明日期，以确定收时期。一般在授粉后一周左右，幼瓜长到鸡蛋大小时选瓜留瓜。除去多余的花和幼瓜。幼瓜长到拳头大小时，要进行吊瓜，用塑料绳或尼龙绳一头拴住瓜柄，或用草圈垫在幼瓜下部、或用塑料网兜吊起，挂在支架或室内横架子的铁丝上。',
      matters_needing_attention:
        '副作用：吃多了，会引起胃肠道不舒服，建议适量吃。禁忌人群：感冒初期患者不宜吃黄河蜜瓜。黄河蜜是什么季节的水果 黄河蜜几月成熟黄河蜜是一种产于甘肃一带的特色水果，它的肉质脆嫩可口，过质量也很大，深受吃货们的喜爱。不过需要注意的是食用过多可能会引起肠胃不适，切记适量而止。'
    })

    // 默认要展开的内容name
    const activeNames = ref(['1', '2'])

    let simpleInfo: any[] = fromatData(fruitInfoData).simpleInfo
    let mainInfo: any[] = fromatData(fruitInfoData).mainInfo

    // onBeforeMount(() => {
    //   // 格式化成要展示的数据
    //   console.log(fromatData(fruitInfoData).simpleInfo)
    //   simpleInfo = fromatData(fruitInfoData).simpleInfo
    //   mainInfo = fromatData(fruitInfoData).mainInfo
    // })
    // onUpdated(() => {
    //   simpleInfo = fromatData(fruitInfoData).simpleInfo
    //   mainInfo = fromatData(fruitInfoData).mainInfo
    // })
    return { fruitInfoData, activeNames, url, srcList, simpleInfo, mainInfo }
  }
})
</script>

<style scoped lang="less">
@import url('@/style');
.info-detail {
  display: flex;
  flex-direction: row;
  min-width: 600px;
  min-height: calc(100vh - 68px);
  gap: 40px;
  margin: 8px 12% 0 12%;

  // 左半区样式
  .el-aside {
    flex: 2;
    width: 300px;
    background-color: @main-color;
    text-align: center;

    // 图片样式
    .el-image {
      border-radius: 4px;
      margin: 25px;

      // 图片阅览的 X 按钮
      :deep .el-image-viewer__wrapper {
        margin-top: 30px;
      }
    }

    // 卡片样式
    .box-card {
      border: 0;
      background-color: rgba(255, 255, 255, 0);
      .text-item {
        color: aliceblue;
        font-size: 14px;
        text-align: left;
        padding: 18px 0 18px 50px;
      }
    }
  }

  // 右半区样式
  .el-main {
    flex: 5;
    --el-main-padding: 0;
    overflow-y: hidden;

    // 标题样式
    :deep .el-collapse-item__header {
      --el-collapse-header-font-size: 16px;
      font-style: normal;
    }
    // 内容样式
    :deep .el-collapse-item__content {
      font-size: 12px;
    }
    // 点开的图片样式
    .demo-image__error .el-image {
      width: 100%;
      height: 200px;
    }
  }
}
</style>
