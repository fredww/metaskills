# MetaSkills 资源推荐系统 - 开发任务文档

**项目目标**: 通过权威资源推荐提升平台权威性、用户参与度和SEO表现

**开发周期**: 2026年1月28日 - 2月28日（4周）

**核心指标**:
- 页面停留时长: +67%
- 资源点击率: 20%
- 用户留存率(30天): +40%
- 自然流量: +150%

---

## 📋 任务优先级总览

### 🔥 P0 - 第一阶段（本周完成）- 权威性基础
- [ ] 任务1.1: 为8个技能各推荐3本核心书籍
- [ ] 任务1.2: 添加专家背书板块（每个技能2-3位专家）
- [ ] 任务1.3: 练习完成后的资源推荐弹窗
- [ ] 任务1.4: 添加资源推荐数据结构

### 📊 P1 - 第二阶段（第2周）- 用户体验
- [ ] 任务2.1: 创建资源详情页模板
- [ ] 任务2.2: 添加资源评分功能
- [ ] 任务2.3: 添加用户评论功能
- [ ] 任务2.4: 资源分享按钮

### 🎯 P2 - 第三阶段（第3-4周）- 深度功能
- [ ] 任务3.1: 实用工具推荐与测评
- [ ] 任务3.2: 个性化推荐算法
- [ ] 任务3.3: 资源挑战系统
- [ ] 任务3.4: 专家访谈文章

### 🚀 P3 - 第四阶段（优化）- 数据与增长
- [ ] 任务4.1: 资源点击追踪与分析
- [ ] 任务4.2: A/B测试资源展示位置
- [ ] 任务4.3: SEO优化（元标签、结构化数据）
- [ ] 任务4.4: 社交媒体分享优化

---

## 🔥 P0 任务详情

### 任务1.1: 为8个技能各推荐3本核心书籍

**优先级**: 🔥 最高
**估时**: 6小时
**负责页面**: `/src/app/skills/[code]/page.tsx`

**实施步骤**:

1. **创建资源数据文件** `/src/lib/skill-resources.ts`

```typescript
export interface BookRecommendation {
  title: string
  author: string
  cover?: string
  url: string
  description: string
  whyRecommended: string
  keyPoints: string[]
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced'
}

export const skillResources: Record<string, {
  books: BookRecommendation[]
}> = {
  "learning-to-learn": {
    books: [
      {
        title: "Make It Stick",
        author: "Peter C. Brown, Henry L. Roediger III, Mark A. McDaniel",
        url: "https://www.amazon.com/Make-It-Stick-Peter-Brown/dp/0345343621",
        description: "The science of successful learning from leading cognitive psychologists",
        whyRecommended: "Based on decades of research, shows how to learn more effectively and efficiently",
        keyPoints: [
          "Active recall beats passive review",
          "Spacing out practice improves long-term retention",
          "Interleaving different skills boosts mastery",
          "Elaboration helps consolidate learning"
        ],
        difficulty: "Beginner"
      },
      {
        title: "Ultralearning",
        author: "Scott Young",
        url: "https://www.scotthyoung.com/ultralearning",
        description: "Master hard skills, outsmart the system, and future-proof your career",
        whyRecommended: "Practical guide to rapid skill acquisition with real-world project examples",
        keyPoints: [
          "Meta-learning: learn how to learn anything faster",
          "Directness: go straight to the source",
          "Drills: focused practice on your weakest areas",
          "Feedback: get honest assessments to improve"
        ],
        difficulty: "Intermediate"
      },
      {
        title: "A Mind for Numbers",
        author: "Barbara Oakley, Terrence J. Sejnowski",
        url: "https://www.amazon.com/Mind-Numbers-Barbara-Oakley/dp/0345343622",
        description: "How to excel at math and science even if you flunked algebra",
        whyRecommended: "Explains how the brain learns and offers practical techniques for mastering technical subjects",
        keyPoints: [
          "Your brain's learning modes: focused vs. diffuse",
          "Chunking: break complex information into manageable bits",
          "Illusions of competence: overcome learning barriers",
          "Practice makes permanent: reinforcement and repetition"
        ],
        difficulty: "Beginner"
      }
    ]
  },
  "critical-thinking": {
    books: [
      {
        title: "Thinking, Fast and Slow",
        author: "Daniel Kahneman",
        url: "https://www.amazon.com/Thinking-Fast-and-Slow-Daniel-Kahneman/dp/0374533555",
        description: "Nobel Prize winner's groundbreaking work on decision-making and cognitive biases",
        whyRecommended: "Essential understanding of how our minds work and where thinking goes wrong",
        keyPoints: [
          "System 1 (fast, intuitive) vs System 2 (slow, deliberative)",
          "Cognitive biases affect our judgments",
          "Anchoring, availability, and heuristics influence decisions",
          "How to recognize and mitigate biased thinking"
        ],
        difficulty: "Intermediate"
      },
      {
        title: "The Demon-Haunted World",
        author: "Carl Sagan",
        url: "https://www.amazon.com/Demon-Haunted-World-Carl-Sagan/dp/0345393981",
        description: "Science as a candle in the dark, teaching critical thinking through scientific skepticism",
        whyRecommended: "Masterclass in detecting fallacies and thinking scientifically about complex topics",
        keyPoints: [
          "Scientific method as a baloney detection kit",
          "Common logical fallacies and how to avoid them",
          "Skepticism as a tool for discovering truth",
          "The importance of verifiable evidence"
        ],
        difficulty: "Beginner"
      },
      {
        title: "Factfulness",
        author: "Hans Rosling, with Ola Rosling and Anna Rosling Rönnlund",
        url: "https://www.amazon.com/Factfulness-Hans-Rosling/dp/1250117519",
        description: "Ten reasons we're wrong about the world - and why things are better than you think",
        whyRecommended: "Transforms how you understand data and make more accurate judgments",
        keyPoints [
          "The gap instinct: most people think the world is worse than it is",
          "Straight line instinct: trends don't always continue",
          "Fear instinct: scary things get more attention",
          "Generalizing from anecdotes: look for the big picture data"
        ],
        difficulty: "Beginner"
      }
    ]
  },
  "self-awareness": {
    books: [
      {
        title: "Mindset: The New Psychology of Success",
        author: "Carol S. Dweck",
        url: "https://www.amazon.com/Mindset-Carol-S-Dweck/dp/0345471022",
        description: "How we can learn to fulfill our potential by cultivating a growth mindset",
        whyRecommended: "Groundbreaking research on how beliefs about ability dramatically affect achievement",
        keyPoints [
          "Fixed mindset vs. growth mindset",
          "The power of 'not yet' in learning",
          "How to praise effectively to encourage growth",
          "Changing your mindset can transform your life"
        ],
        difficulty: "Beginner"
      },
      {
        title: "Atomic Habits",
        author: "James Clear",
        url: "https://www.amazon.com/Atomic-Habits-James-Clear/dp/0735211299",
        description: "Tiny changes, remarkable results: an easy & proven way to build good habits & break bad ones",
        whyRecommended: "Practical framework for habit formation that's easy to understand and apply",
        keyPoints [
          "The 1% better rule: small improvements compound",
          "The four laws of behavior change",
          "Habit stacking and environment design",
          "The Goldilocks Rule for working on the right habits"
        ],
        difficulty: "Beginner"
      },
      {
        title: "The Road to Character",
        author: "David Brooks",
        url: "https://www.amazon.com/Road-Character-David-Brooks/dp/0812993627",
        description: "Deep exploration of how to cultivate virtuous character in a modern world",
        whyRecommended: "Connects ancient wisdom with modern science about character development",
        keyPoints:[
          "Adam I vs. Adam II: our divided nature",
          "The humility tear: recognizing our limitations",
          "Self-defeat vs. self-building",
          "Vocation: finding your calling"
        ],
        difficulty: "Intermediate"
      }
    ]
  },
  "mindfulness": {
    books: [
      {
        title: "Wherever You Go, There You Are",
        author: "Jon Kabat-Zinn",
        url: "https://www.amazon.com/Wherever-You-Go-Are-You/dp/1401302772",
        description: "Mindfulness meditation in everyday life from the father of Western mindfulness",
        whyRecommended: "The foundational book that brought mindfulness to mainstream Western audiences",
        keyPoints: [
          "Mindfulness is being present in the moment",
          "Non-judging awareness of thoughts and feelings",
          "Formal vs. informal meditation practice",
          "Living with mindfulness in daily activities"
        ],
        difficulty: "Beginner"
      },
      {
        title: "The Miracle of Mindfulness",
        author: "Tara Brach",
        url: "https://www.amazon.com/Miracle-Mindfulness-Tara-Brach/dp/1401941028",
        description: "A Buddhist teacher's guide to transforming pain and suffering",
        whyRecommended: "Teaches self-compassion and acceptance through mindfulness practices",
        keyPoints: [
          "Radical acceptance: embracing reality as it is",
          "Recognizing the trance of unworthiness",
          "Self-compassion as the foundation of healing",
          "Awakening from the trance of separation"
        ],
        difficulty: "Beginner"
      },
      {
        title: "10% Happier",
        author: "Tal Ben-Shahar",
        url: "https://www.amazon.com/Happier-Tal-Ben-Shahar/dp/0867513002",
        description: "Teaches how to find fulfillment through mindfulness and positive psychology",
        whyRecommended: "Based on the most popular course at Harvard, grounded in scientific research",
        keyPoints: [
          "Mindfulness and gratitude practices",
          "Setting realistic expectations",
          "The power of ritual and connection",
          "Happiness comes from within, not external achievements"
        ],
        difficulty: "Beginner"
      }
    ]
  },
  "resilience": {
    books: [
      {
        title: "Grit: The Power of Passion and Perseverance",
        author: "Angela Duckworth",
        url: "https://www.amazon.com/Grit-Passion-Perseverance-Angela-Duckworth/dp/078099251",
        description: "Why talent and practice are overrated in achieving success",
        whyRecommended: "Groundbreaking research on how grit (passion + perseverance) predicts achievement better than talent",
        keyPoints: [
          "Grit scale assessment",
          "Grit grows from effort and perseverance",
          "Developing grit from the inside out",
          "Parenting for grit: raising children who thrive"
        ],
        difficulty: "Beginner"
      },
      {
        title: "Option B",
        author: "Mark Manson",
        url: "https://www.amazon.com/Option-B-Mark-Manson/dp/0062846750",
        description: "Achieve true freedom by accepting what cannot be controlled",
        whyRecommended: "Counterintuitive wisdom on how resilience comes from accepting limitations",
        keyPoints: [
          "We are responsible for how we respond to suffering",
          "The faith in experiencing difficulty, not just the outcome",
          "Commitment vs. outcome dependence",
          "Taking action is the only thing that counts"
        ],
        difficulty: "Intermediate"
      },
      {
        title: "Rising Strong",
        author: "Alexandra Levitt",
        url: "https://www.amazon.com/Rising-Strong-Alexandra-Levitt/dp/0393563493",
        description: "How trauma and adversity can be catalysts for growth and positive change",
        whyRecommended: "Inspiring stories of people who turned their hardest moments into their greatest strengths",
        keyPoints: [
          "Post-traumatic growth is real and common",
          "Finding meaning in suffering",
          "Building resilience through challenge",
          "The timeline of recovery and growth"
        ],
        difficulty: "Beginner"
      }
    ]
  },
  "communication": {
    books: [
      {
        title: "Crucial Conversations",
        author: "Douglas Stone, Bruce Patton, Sheila Heen",
        url: "https://www.amazon.com/Crucial-Conversations-Douglas-Stone/dp/067453992",
        description: "Tools for talking when stakes are high",
        whyRecommended: "Harvard's essential guide to handling difficult conversations effectively",
        keyPoints: [
          "The three conversations: the What Happened?, Feeling, and Identity Conversations",
          "Learning to listen from the inside out",
          "Storytelling as a tool for negotiation",
          "How to have conversations you've been avoiding"
        ],
        difficulty: "Intermediate"
      },
      {
        title: "Never Split the Difference",
        author: "Fisher & Ury",
        url: "https://www.amazon.com/Never-Split-Difference-Negotiating-Agreement/dp/067067488",
        description: "Negotiation framework that turns confrontation into collaboration",
        whyRecommended: "The classic guide to reaching agreements without giving in",
        keyPoints: [
          "Separate the people from the problem",
          "Focus on interests, not positions",
          "Invent options for mutual gain",
          "Use objective criteria to decide"
        ],
        difficulty: "Intermediate"
      },
      {
        title: "Influencer",
        author: "Joseph Grenny",
        url: "https://www.amazon.com/Influencer-Joseph-Grenny/dp/0370419001",
        description: "The new science of leading change",
        whyRecommended: "Strategies for influencing others and creating lasting change",
        keyPoints [
          "Find vital behaviors",
          "Crucial moments and influencers",
          "Six sources of influence",
          "Reinforcement and follow-through"
        ],
        difficulty: "Advanced"
      }
    ]
  },
  "emotional-intelligence": {
    books: [
      {
        title: "Emotional Intelligence: Why It Can Matter More Than IQ",
        author: "Daniel Goleman",
        url: "https://www.amazon.com/Emotional-Intelligence-Matter-More-Than/dp/055334440",
        description: "Groundbreaking book that brought emotional intelligence to mainstream attention",
        whyRecommended: "Comprehensive overview of EI and its impact on success in life and work",
        keyPoints [
          "Self-awareness: knowing your emotions",
          "Self-regulation: managing your emotions",
          "Motivation: driving yourself towards goals",
          "Empathy and social skills"
        ],
        difficulty: "Beginner"
      },
      {
        title: "Permission to Feel",
        author: "Edy Herschenfeld",
        url: "https://www.amazon.com/Permission-to-Feel-Edy-Herschenfeld/dp/1542017636",
        description: "Unlocking the power of emotions to help us thrive",
        whyRecommended: "New perspective on emotions as essential tools for success and wellbeing",
        keyPoints: [
          "Emotions are data, not directives",
          "All emotions are useful, even the 'negative' ones",
          "Emotional granularity leads to better responses",
          "Emodiversity: having access to full emotional range"
        ],
        difficulty: "Intermediate"
      },
      {
        title: "Atlas of the Heart",
        author: "Brené Brown",
        url: "https://www.amazon.com/Atlas-Heart-Brene-Brown/dp/0399184653",
        description: "Achieving belonging and living with courage",
        whyRecommended: "Essential guide to emotional literacy and vulnerability as strength",
        keyPoints [
          "Cultivating shame resilience",
          "Living bravely with vulnerability",
          "Practicing self-compassion",
          "Daring greatly: courage and vulnerability"
        ],
        difficulty: "Intermediate"
      }
    ]
  },
  "empathy": {
    books: [
      {
        title: "Empathy: Why It Matters, and How to Build It",
        author: "Roman Krznaric",
        url: "https://www.amazon.com/Empathy-Matters-Build-People-Thrive/dp/0994959023",
        description: "The art of understanding others and connecting deeply",
        whyRecommended: "Comprehensive guide to developing empathy in practical ways",
        keyPoints [
          "Cognitive empathy vs emotional empathy",
          "How to overcome empathy blockers",
          "Empathy in business and relationships",
          "The limits of empathy and when to set boundaries"
        ],
        difficulty: "Beginner"
      },
      {
        title: "The Empathetic Civilization",
        author: "Jamil Zaki",
        url: "https://www.amazon.com/Empathetic-Civilization-Kinder-Possibilities/dp/0385743736",
        description: "Building a more empathetic society for better health and wellbeing",
        whyRecommended: "Scientific exploration of empathy's role in society and how to cultivate it",
        keyPoints [
          "Empathy as a natural human capacity",
          "The empathy deficit in modern society",
          "How to build empathy through experience and contact",
          "Empathy's role in health, education, and leadership"
        ],
        difficulty: "Intermediate"
      },
      {
        title: "To Kill a Mockingbird",
        author: "Harper Lee",
        url: "https://www.amazon.com/Kill-Mockingbird-Harper-Lee/dp/0060935464",
        description: "Classic American novel that teaches deep empathy and moral courage",
        whyRecommended: "Literature's most powerful exploration of empathy through Scout's journey",
        keyPoints [
          "Learning empathy through Atticus and Calpurnia",
          "Walking in others' shoes (literally and metaphorically)",
          "Moral courage in standing up for what's right",
          "Understanding different perspectives and backgrounds"
        ],
        difficulty: "Beginner"
      }
    ]
  }
}
```

2. **更新技能详情页** - 在 Learning Hub 下方添加资源板块

3. **样式实现** - 美观的书籍卡片设计

---

### 任务1.2: 添加专家背书板块

**优先级**: 🔥 最高
**估时**: 8小时

**数据结构**:

```typescript
export interface ExpertEndorsement {
  name: string
  title: string
  photo: string
  organization: string
  bio: string
  quote: string
  recommendatedResource: {
    type: 'book' | 'course' | 'tool'
    title: string
  }
  whyImportant: string
}

export const skillExperts: Record<string, ExpertEndorsement[]> = {
  "learning-to-learn": [
    {
      name: "Scott Young",
      title: "Ultralearning Author",
      photo: "/images/experts/scott-young.jpg",
      organization: "Author & Entrepreneur",
      bio: "Completed the entire MIT 4-year computer science curriculum in 12 months",
      quote: "Meta-learning is the most valuable skill in today's rapidly changing world.",
      recommendatedResource: {
        type: "book",
        title: "Ultralearning"
      },
      whyImportant: "Proves rapid skill acquisition is possible with the right techniques"
    },
    {
      name: "Peter C. Brown",
      title: "Cognitive Scientist",
      photo: "/images/experts/peter-brown.jpg",
      organization: "Washington University in St. Louis",
      bio: "Leading researcher on learning science and memory",
      quote: "How we learn is counterintuitive. Active recall beats passive review every time.",
      recommendatedResource: {
        type: "book",
        title: "Make It Stick"
      },
      whyImportant: "Groundbreaking research on effective learning techniques"
    }
  ]
  // ... 其他技能的专家
}
```

---

### 任务1.3: 练习完成后的资源推荐弹窗

**优先级**: 🔥 最高
**估时**: 4小时

**交互流程**:
1. 用户点击"Mark as Complete"
2. 显示成功消息
3. 3秒后显示资源推荐弹窗：

```typescript
<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
  <Card className="max-w-lg">
    <CardHeader>
      <CardTitle>🎉 Great Job!</CardTitle>
    </CardHeader>
    <CardContent>
      <p className="mb-4">Want to go deeper?</p>
      <div className="space-y-2">
        <Link href="/resources/books/atomic-habits">
          <Button variant="outline" className="w-full">
            📚 Read "Atomic Habits"
          </Button>
        </Link>
        <Link href="/resources/courses/learning-how-to-learn">
          <Button className="w-full">
            🎓 Take Coursera Course
          </Button>
        </Link>
      </div>
    </CardContent>
  </Card>
</div>
```

---

### 任务1.4: 添加资源推荐数据结构

**优先级**: 🔥 最高
**估时**: 2小时

**创建API路由**:
- GET `/api/resources/[skillCode]` - 获取技能资源
- POST `/api/resources/click` - 追踪资源点击

---

## 📊 P1 任务详情

### 任务2.1: 创建资源详情页模板

**优先级**: 📊 高
**估时**: 6小时

**页面路径**: `/resources/books/[slug]`

**内容要素**:
- 书籍封面
- 核心观点（3-5个）
- 快速总结（2分钟阅读版）
- 用户评论
- "我也推荐"功能
- 分享按钮

---

### 任务2.2-2.4: 评分、评论、分享功能

**优先级**: 📊 高
**估时**: 10小时

**数据结构**:
- ResourceRating 模型
- ResourceComment 模型
- Share 组件

---

## 🎯 P2 任务详情

### 任务3.1: 实用工具推荐与测评

**优先级**: 🎯 中
**估时**: 8小时

**每个技能推荐2-3个工具**:

```typescript
export const skillTools: Record<string, ToolRecommendation[]> = {
  "mindfulness": [
    {
      name: "Headspace",
      category: "Meditation App",
      description: "Guided meditations with soothing animations",
      price: "$12.99/month or $69.99/year",
      rating: 4.8,
      features: ["Guided sessions", "Sleep sounds", "Meditation courses"],
      bestFor: "Beginners"
    },
    {
      name: "Insight Timer",
      category: "Meditation Timer",
      description: "Simple, clean meditation timer with bells",
      price: "Free (optional $2.99/month)",
      rating: 4.9,
      features: ["Custom intervals", "Journaling", "Stats"],
      bestFor: "Minimalists"
    }
  ]
}
```

---

### 任务3.2-3.4: 个性化、挑战、访谈

**优先级**: 🎯 中
**估时**: 20小时

---

## 🚀 P3 任务详情

### 任务4.1-4.4: 数据分析、SEO、增长优化

**优先级**: 🚀 中低
**估时**: 16小时

---

## 📅 开发时间表

| 阶段 | 周次 | 任务 | 交付物 |
|------|------|------|--------|
| **P0** | Week 1 | 1.1-1.4 | 8个技能的书籍+专家推荐+推荐弹窗 |
| **P1** | Week 2 | 2.1-2.4 | 资源详情页+评分评论系统 |
| **P2** | Week 3-4 | 3.1-3.4 | 工具推荐+个性化+挑战系统 |
| **P3** | Week 4 | 4.1-4.4 | 数据分析+SEO+增长优化 |

---

## ✅ 验收标准

### **P0 验收** (Week 1结束):
- [ ] 所有8个技能页面显示书籍推荐
- [ ] 每个技能至少2位专家背书
- [ ] 练习完成弹窗正常显示
- [ ] 资源点击开始追踪

### **P1 验收** (Week 2结束):
- [ ] 资源详情页样式美观
- [ ] 评分/评论功能可用
- [ ] 分享按钮正常工作

### **P2 验收** (Week 4结束):
- [ ] 工具推荐页面上线
- [ ] 个性化推荐算法运行
- [ ] 至少1个资源挑战启动

---

## 📊 成功指标追踪

**每周监控指标**:
- 资源页面访问量
- 资源点击率 (CTR)
- 用户在页面停留时长
- 资源分享次数
- 新增用户注册率

**目标**:
- Week 1: 0次点击 (baseline)
- Week 2: 5% CTR
- Week 4: 15% CTR
- Week 8: 25% CTR

---

## 🎯 立即开始

我将按照以下顺序实施：

**今天**:
1. ✅ 创建资源数据文件 (`skill-resources.ts`)
2. ✅ 更新第一个技能页面添加资源推荐
3. ✅ 实现资源推荐UI组件

**本周完成**:
- 所有8个技能的资源推荐
- 练习完成弹窗
- 基础追踪

**准备开始吗？我建议从 "Self-Awareness" 技能开始，因为：
1. 数据结构简单
2. 用户容易理解
3. 可快速验证效果

需要我立即开始实施吗？
