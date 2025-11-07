<template>
  <div class="app">
    <h1>Vue3 Component Library Demo</h1>
    
    <!-- Layout Demo -->
    <section class="demo-section">
      <h2>Layout 布局组件</h2>
      <div class="demo-item">
        <h3>基础用法</h3>
        <vc-row>
          <vc-col :span="24"><div class="grid-content bg-purple-dark">col-24</div></vc-col>
        </vc-row>
        <vc-row>
          <vc-col :span="12"><div class="grid-content bg-purple">col-12</div></vc-col>
          <vc-col :span="12"><div class="grid-content bg-purple-light">col-12</div></vc-col>
        </vc-row>
        <vc-row>
          <vc-col :span="8"><div class="grid-content bg-purple">col-8</div></vc-col>
          <vc-col :span="8"><div class="grid-content bg-purple-light">col-8</div></vc-col>
          <vc-col :span="8"><div class="grid-content bg-purple">col-8</div></vc-col>
        </vc-row>
      </div>
      
      <div class="demo-item">
        <h3>分栏间隔</h3>
        <vc-row :gutter="20">
          <vc-col :span="6"><div class="grid-content bg-purple">col-6</div></vc-col>
          <vc-col :span="6"><div class="grid-content bg-purple">col-6</div></vc-col>
          <vc-col :span="6"><div class="grid-content bg-purple">col-6</div></vc-col>
          <vc-col :span="6"><div class="grid-content bg-purple">col-6</div></vc-col>
        </vc-row>
      </div>
    </section>

    <!-- Button Demo -->
    <section class="demo-section">
      <h2>Button 按钮组件</h2>
      <div class="demo-item">
        <h3>基础用法</h3>
        <div class="demo-box">
          <vc-button>默认按钮</vc-button>
          <vc-button type="primary">主要按钮</vc-button>
          <vc-button type="success">成功按钮</vc-button>
          <vc-button type="warning">警告按钮</vc-button>
          <vc-button type="danger">危险按钮</vc-button>
          <vc-button type="info">信息按钮</vc-button>
        </div>
      </div>
      
      <div class="demo-item">
        <h3>禁用状态</h3>
        <div class="demo-box">
          <vc-button disabled>默认按钮</vc-button>
          <vc-button type="primary" disabled>主要按钮</vc-button>
          <vc-button type="success" disabled>成功按钮</vc-button>
        </div>
      </div>
      
      <div class="demo-item">
        <h3>加载中</h3>
        <div class="demo-box">
          <vc-button type="primary" loading>加载中</vc-button>
        </div>
      </div>
      
      <div class="demo-item">
        <h3>不同尺寸</h3>
        <div class="demo-box">
          <vc-button size="medium">中等按钮</vc-button>
          <vc-button size="small">小型按钮</vc-button>
          <vc-button size="mini">超小按钮</vc-button>
        </div>
      </div>
    </section>

    <!-- Checkbox Demo -->
    <section class="demo-section">
      <h2>Checkbox 多选框</h2>
      <div class="demo-item">
        <h3>基础用法</h3>
        <div class="demo-box">
          <vc-checkbox v-model="checked">备选项</vc-checkbox>
        </div>
        <p>选中状态: {{ checked }}</p>
      </div>
      
      <div class="demo-item">
        <h3>多选框组</h3>
        <div class="demo-box">
          <vc-checkbox-group v-model="checkList">
            <vc-checkbox label="复选框 A"></vc-checkbox>
            <vc-checkbox label="复选框 B"></vc-checkbox>
            <vc-checkbox label="复选框 C"></vc-checkbox>
          </vc-checkbox-group>
        </div>
        <p>选中项: {{ checkList }}</p>
      </div>
    </section>

    <!-- Input Demo -->
    <section class="demo-section">
      <h2>Input 输入框</h2>
      <div class="demo-item">
        <h3>基础用法</h3>
        <vc-input v-model="input" placeholder="请输入内容"></vc-input>
        <p>输入值: {{ input }}</p>
      </div>
      
      <div class="demo-item">
        <h3>禁用状态</h3>
        <vc-input v-model="input" placeholder="请输入内容" disabled></vc-input>
      </div>
      
      <div class="demo-item">
        <h3>可清空</h3>
        <vc-input v-model="input2" placeholder="请输入内容" clearable></vc-input>
      </div>
      
      <div class="demo-item">
        <h3>密码框</h3>
        <vc-input v-model="password" type="password" placeholder="请输入密码" show-password></vc-input>
      </div>
      
      <div class="demo-item">
        <h3>文本域</h3>
        <vc-input v-model="textarea" type="textarea" :rows="3" placeholder="请输入内容"></vc-input>
      </div>
    </section>

    <!-- Form Demo -->
    <section class="demo-section">
      <h2>Form 表单</h2>
      <vc-form ref="formRef" :model="formData" :rules="rules" label-width="100px">
        <vc-form-item label="用户名" prop="username">
          <vc-input v-model="formData.username" placeholder="请输入用户名"></vc-input>
        </vc-form-item>
        
        <vc-form-item label="密码" prop="password">
          <vc-input v-model="formData.password" type="password" placeholder="请输入密码"></vc-input>
        </vc-form-item>
        
        <vc-form-item label="邮箱" prop="email">
          <vc-input v-model="formData.email" placeholder="请输入邮箱"></vc-input>
        </vc-form-item>
        
        <vc-form-item label="爱好" prop="hobby">
          <vc-checkbox-group v-model="formData.hobby">
            <vc-checkbox label="阅读"></vc-checkbox>
            <vc-checkbox label="运动"></vc-checkbox>
            <vc-checkbox label="音乐"></vc-checkbox>
          </vc-checkbox-group>
        </vc-form-item>
        
        <vc-form-item>
          <vc-button type="primary" @click="submitForm">提交</vc-button>
          <vc-button @click="resetForm">重置</vc-button>
        </vc-form-item>
      </vc-form>
    </section>

    <!-- Transfer Demo -->
    <section class="demo-section">
      <h2>Transfer 穿梭框</h2>
      <div class="demo-item">
        <h3>基础用法</h3>
        <vc-transfer
          v-model="transferValue"
          :data="transferData"
          filterable
          :titles="['待选择', '已选择']"
          :button-texts="['添加', '移除']"
        />
        <p>当前已选择：{{ transferValue }}</p>
      </div>
    </section>

    <!-- Collapse Demo -->
    <section class="demo-section">
      <h2>Collapse 折叠面板</h2>
      <div class="demo-item">
        <h3>基础用法</h3>
        <vc-collapse v-model="activeCollapse">
          <vc-collapse-item title="一致性 Consistency" name="1">
            <p>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念。</p>
          </vc-collapse-item>
          <vc-collapse-item title="反馈 Feedback" name="2">
            <p>控制反馈：通过界面样式和交互动效让用户可以清晰感知自己的操作。</p>
          </vc-collapse-item>
          <vc-collapse-item title="效率 Efficiency" name="3">
            <p>简化流程：设计简洁直观的操作流程，提高效率。</p>
          </vc-collapse-item>
        </vc-collapse>
      </div>

      <div class="demo-item">
        <h3>手风琴模式</h3>
        <vc-collapse v-model="activeAccordion" accordion>
          <vc-collapse-item title="Vue" name="vue">渐进式 JavaScript 框架</vc-collapse-item>
          <vc-collapse-item title="React" name="react">用于构建用户界面的 JavaScript 库</vc-collapse-item>
          <vc-collapse-item title="Svelte" name="svelte">编译型前端框架</vc-collapse-item>
        </vc-collapse>
      </div>
    </section>

    <!-- Infinite Scroll Demo -->
    <section class="demo-section">
      <h2>Infinite Scroll 无限滚动</h2>
      <div class="demo-item">
        <h3>基础用法</h3>
        <div
          class="infinite-list"
          v-infinite-scroll="{ handler: loadMore, disabled: loading || list.length >= maxItems, distance: 40 }"
        >
          <div v-for="item in list" :key="item" class="infinite-list-item">列表项 {{ item }}</div>
          <div v-if="loading" class="infinite-list-status">加载中...</div>
          <div v-else-if="list.length >= maxItems" class="infinite-list-status">没有更多了</div>
        </div>
        <div class="demo-box">
          <vc-button type="primary" @click="resetInfinite">重置列表</vc-button>
        </div>
      </div>
    </section>

    <!-- Icon Demo -->
    <section class="demo-section">
      <h2>Icon 图标</h2>
      
      <div class="demo-item">
        <h3>基础用法</h3>
        <div class="demo-box">
          <vc-icon>
            <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor">
              <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"/>
            </svg>
          </vc-icon>
        </div>
      </div>

      <div class="demo-item">
        <h3>不同尺寸</h3>
        <div class="demo-box">
          <vc-icon :size="12">
            <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor">
              <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"/>
            </svg>
          </vc-icon>
          <vc-icon :size="16">
            <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor">
              <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"/>
            </svg>
          </vc-icon>
          <vc-icon :size="24">
            <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor">
              <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"/>
            </svg>
          </vc-icon>
          <vc-icon :size="32">
            <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor">
              <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"/>
            </svg>
          </vc-icon>
          <vc-icon size="48px">
            <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor">
              <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"/>
            </svg>
          </vc-icon>
        </div>
      </div>

      <div class="demo-item">
        <h3>不同颜色</h3>
        <div class="demo-box">
          <vc-icon color="#409eff">
            <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor">
              <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"/>
            </svg>
          </vc-icon>
          <vc-icon color="#67c23a">
            <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor">
              <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"/>
            </svg>
          </vc-icon>
          <vc-icon color="#e6a23c">
            <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor">
              <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"/>
            </svg>
          </vc-icon>
          <vc-icon color="#f56c6c">
            <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor">
              <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"/>
            </svg>
          </vc-icon>
          <vc-icon color="#909399">
            <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor">
              <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"/>
            </svg>
          </vc-icon>
        </div>
      </div>

      <div class="demo-item">
        <h3>旋转动画</h3>
        <div class="demo-box">
          <vc-icon spin>
            <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor">
              <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"/>
            </svg>
          </vc-icon>
          <vc-icon spin color="#409eff">
            <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor">
              <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"/>
            </svg>
          </vc-icon>
        </div>
      </div>

      <div class="demo-item">
        <h3>可点击图标</h3>
        <div class="demo-box">
          <vc-icon 
            color="#409eff" 
            :size="24"
            style="cursor: pointer;"
            @click="handleIconClick('搜索')"
          >
            <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor">
              <path d="M909.6 854.5L649.9 594.8C690.2 542.7 712 479 712 412c0-80.2-31.3-155.4-87.9-212.1-56.6-56.7-132-87.9-212.1-87.9s-155.5 31.3-212.1 87.9C143.2 256.5 112 331.8 112 412c0 80.1 31.3 155.5 87.9 212.1C256.5 680.4 331.8 712 412 712c67 0 130.6-21.8 182.7-62l259.7 259.6a8.2 8.2 0 0 0 11.6 0l43.6-43.5a8.2 8.2 0 0 0 0-11.6zM570.4 570.4C528 612.7 471.8 636 412 636s-116-23.3-158.4-65.6C211.3 528 188 471.8 188 412s23.3-116.1 65.6-158.4C296 211.3 352.2 188 412 188s116.1 23.2 158.4 65.6C612.7 296 636 352.2 636 412s-23.3 116.1-65.6 158.4z"/>
            </svg>
          </vc-icon>
          <vc-icon 
            color="#67c23a" 
            :size="24"
            style="cursor: pointer;"
            @click="handleIconClick('设置')"
          >
            <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor">
              <path d="M512 64a32 32 0 0 1 32 32v64a32 32 0 0 1-64 0V96a32 32 0 0 1 32-32zm0 768a32 32 0 0 1 32 32v64a32 32 0 0 1-64 0v-64a32 32 0 0 1 32-32zm448-416a32 32 0 0 1-32 32h-64a32 32 0 0 1 0-64h64a32 32 0 0 1 32 32zM128 416a32 32 0 0 1-32-32v-64a32 32 0 0 1 64 0v64a32 32 0 0 1-32 32zm784.192-234.56a32 32 0 0 1-45.248-45.248l45.248-45.248a32 32 0 1 1 45.248 45.248l-45.248 45.248zm-636.384 636.384a32 32 0 0 1-45.248-45.248l45.248-45.248a32 32 0 1 1 45.248 45.248l-45.248 45.248zm636.384 0l-45.248-45.248a32 32 0 0 1 45.248-45.248l45.248 45.248a32 32 0 0 1-45.248 45.248zm-636.384-636.384l-45.248-45.248a32 32 0 0 1 45.248-45.248l45.248 45.248a32 32 0 1 1-45.248 45.248zM512 192a320 320 0 1 1 0 640 320 320 0 0 1 0-640zm0 64a256 256 0 1 0 0 512 256 256 0 0 0 0-512z"/>
            </svg>
          </vc-icon>
          <vc-icon 
            color="#e6a23c" 
            :size="24"
            style="cursor: pointer;"
            @click="handleIconClick('用户')"
          >
            <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor">
              <path d="M512 512a192 192 0 1 0 0-384 192 192 0 0 0 0 384zm0 64a256 256 0 1 1 0-512 256 256 0 0 1 0 512zm320 320v-96a96 96 0 0 0-96-96H288a96 96 0 0 0-96 96v96a32 32 0 1 1-64 0v-96a160 160 0 0 1 160-160h448a160 160 0 0 1 160 160v96a32 32 0 1 1-64 0z"/>
            </svg>
          </vc-icon>
        </div>
        <p v-if="iconClickMessage" style="margin-top: 10px; color: #409eff;">{{ iconClickMessage }}</p>
      </div>

      <div class="demo-item">
        <h3>常用图标</h3>
        <div class="demo-box icon-grid">
          <div class="icon-item">
            <vc-icon :size="24">
              <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor">
                <path d="M909.6 854.5L649.9 594.8C690.2 542.7 712 479 712 412c0-80.2-31.3-155.4-87.9-212.1-56.6-56.7-132-87.9-212.1-87.9s-155.5 31.3-212.1 87.9C143.2 256.5 112 331.8 112 412c0 80.1 31.3 155.5 87.9 212.1C256.5 680.4 331.8 712 412 712c67 0 130.6-21.8 182.7-62l259.7 259.6a8.2 8.2 0 0 0 11.6 0l43.6-43.5a8.2 8.2 0 0 0 0-11.6zM570.4 570.4C528 612.7 471.8 636 412 636s-116-23.3-158.4-65.6C211.3 528 188 471.8 188 412s23.3-116.1 65.6-158.4C296 211.3 352.2 188 412 188s116.1 23.2 158.4 65.6C612.7 296 636 352.2 636 412s-23.3 116.1-65.6 158.4z"/>
              </svg>
            </vc-icon>
            <span>搜索</span>
          </div>
          <div class="icon-item">
            <vc-icon :size="24">
              <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor">
                <path d="M512 64a32 32 0 0 1 32 32v64a32 32 0 0 1-64 0V96a32 32 0 0 1 32-32zm0 768a32 32 0 0 1 32 32v64a32 32 0 0 1-64 0v-64a32 32 0 0 1 32-32zm448-416a32 32 0 0 1-32 32h-64a32 32 0 0 1 0-64h64a32 32 0 0 1 32 32zM128 416a32 32 0 0 1-32-32v-64a32 32 0 0 1 64 0v64a32 32 0 0 1-32 32zm784.192-234.56a32 32 0 0 1-45.248-45.248l45.248-45.248a32 32 0 1 1 45.248 45.248l-45.248 45.248zm-636.384 636.384a32 32 0 0 1-45.248-45.248l45.248-45.248a32 32 0 1 1 45.248 45.248l-45.248 45.248zm636.384 0l-45.248-45.248a32 32 0 0 1 45.248-45.248l45.248 45.248a32 32 0 0 1-45.248 45.248zm-636.384-636.384l-45.248-45.248a32 32 0 0 1 45.248-45.248l45.248 45.248a32 32 0 1 1-45.248 45.248zM512 192a320 320 0 1 1 0 640 320 320 0 0 1 0-640zm0 64a256 256 0 1 0 0 512 256 256 0 0 0 0-512z"/>
              </svg>
            </vc-icon>
            <span>设置</span>
          </div>
          <div class="icon-item">
            <vc-icon :size="24">
              <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor">
                <path d="M512 512a192 192 0 1 0 0-384 192 192 0 0 0 0 384zm0 64a256 256 0 1 1 0-512 256 256 0 0 1 0 512zm320 320v-96a96 96 0 0 0-96-96H288a96 96 0 0 0-96 96v96a32 32 0 1 1-64 0v-96a160 160 0 0 1 160-160h448a160 160 0 0 1 160 160v96a32 32 0 1 1-64 0z"/>
              </svg>
            </vc-icon>
            <span>用户</span>
          </div>
          <div class="icon-item">
            <vc-icon :size="24">
              <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor">
                <path d="M832 464h-68V240c0-70.7-57.3-128-128-128H388c-70.7 0-128 57.3-128 128v224h-68c-17.7 0-32 14.3-32 32v384c0 17.7 14.3 32 32 32h640c17.7 0 32-14.3 32-32V496c0-17.7-14.3-32-32-32zM332 240c0-30.9 25.1-56 56-56h248c30.9 0 56 25.1 56 56v224H332V240zm460 600H232V536h560v304z"/>
              </svg>
            </vc-icon>
            <span>文件夹</span>
          </div>
          <div class="icon-item">
            <vc-icon :size="24">
              <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor">
                <path d="M880 112H144c-17.7 0-32 14.3-32 32v736c0 17.7 14.3 32 32 32h736c17.7 0 32-14.3 32-32V144c0-17.7-14.3-32-32-32zM513.1 518.1l-192 161c-5.2 4.4-13.1.7-13.1-6.1v-62.7c0-2.3 1.1-4.6 2.9-6.1L420.7 512l-109.8-92.2a7.63 7.63 0 0 1-2.9-6.1V351c0-6.8 7.9-10.5 13.1-6.1l192 160.9c3.9 3.2 3.9 9.1 0 12.3zM716 673c0 4.4-3.4 8-7.5 8h-185c-4.1 0-7.5-3.6-7.5-8v-48c0-4.4 3.4-8 7.5-8h185c4.1 0 7.5 3.6 7.5 8v48z"/>
              </svg>
            </vc-icon>
            <span>播放</span>
          </div>
          <div class="icon-item">
            <vc-icon :size="24">
              <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor">
                <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"/>
                <path d="M464 336a48 48 0 1 0 96 0 48 48 0 1 0-96 0zm72 112h-48c-4.4 0-8 3.6-8 8v272c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V456c0-4.4-3.6-8-8-8z"/>
              </svg>
            </vc-icon>
            <span>信息</span>
          </div>
          <div class="icon-item">
            <vc-icon :size="24">
              <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor">
                <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"/>
                <path d="M464 688a48 48 0 1 0 96 0v-224a48 48 0 1 0-96 0v224zm24-336h48c4.4 0 8-3.6 8-8v-48c0-4.4-3.6-8-8-8h-48c-4.4 0-8 3.6-8 8v48c0 4.4 3.6 8 8 8z"/>
              </svg>
            </vc-icon>
            <span>警告</span>
          </div>
          <div class="icon-item">
            <vc-icon :size="24">
              <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor">
                <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm165.4 618.2l-66-.3L512 563.4l-99.3 118.4-66.1.3c-4.4 0-8-3.5-8-8 0-1.9.7-3.7 1.9-5.2l130.1-155L340.5 359a8.32 8.32 0 0 1 1.9-5.2c0-4.4 3.6-8 8-8l66.1.3L512 464.6l99.3-118.4 66-.3c4.4 0 8 3.5 8 8 0 1.9-.7 3.7-1.9 5.2L553.5 514l130.1 155c1.2 1.5 1.9 3.3 1.9 5.2 0 4.4-3.6 8-8 8z"/>
              </svg>
            </vc-icon>
            <span>关闭</span>
          </div>
        </div>
      </div>

      <div class="demo-item">
        <h3>字体图标类名</h3>
        <div class="demo-box">
          <i class="vc-icon-loading"></i>
          <span style="margin-left: 8px;">加载中</span>
          <i class="vc-icon-circle-close" style="margin-left: 24px;"></i>
          <span style="margin-left: 8px;">关闭</span>
          <i class="vc-icon-view" style="margin-left: 24px;"></i>
          <span style="margin-left: 8px;">查看</span>
          <i class="vc-icon-hide" style="margin-left: 24px;"></i>
          <span style="margin-left: 8px;">隐藏</span>
        </div>
      </div>

      <div class="demo-item">
        <h3>在按钮中使用图标</h3>
        <div class="demo-box">
          <vc-button type="primary">
            <vc-icon :size="16" style="margin-right: 4px;">
              <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor">
                <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm193.5 301.7l-210.6 292a31.8 31.8 0 0 1-51.7 0L318.5 484.9c-3.8-5.3 0-12.7 6.5-12.7h46.9c10.2 0 19.9 4.9 25.9 13.3l71.2 98.8 157.2-218c6-8.3 15.6-13.3 25.9-13.3H699c6.5 0 10.3 7.4 6.5 12.7z"/>
              </svg>
            </vc-icon>
            成功
          </vc-button>
          <vc-button type="primary" loading>加载中</vc-button>
          <vc-button>
            <vc-icon :size="16" style="margin-right: 4px;">
              <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor">
                <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm165.4 618.2l-66-.3L512 563.4l-99.3 118.4-66.1.3c-4.4 0-8-3.5-8-8 0-1.9.7-3.7 1.9-5.2l130.1-155L340.5 359a8.32 8.32 0 0 1 1.9-5.2c0-4.4 3.6-8 8-8l66.1.3L512 464.6l99.3-118.4 66-.3c4.4 0 8 3.5 8 8 0 1.9-.7 3.7-1.9 5.2L553.5 514l130.1 155c1.2 1.5 1.9 3.3 1.9 5.2 0 4.4-3.6 8-8 8z"/>
              </svg>
            </vc-icon>
            取消
          </vc-button>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'

// Checkbox
const checked = ref(false)
const checkList = ref<string[]>([])

// Input
const input = ref('')
const input2 = ref('')
const password = ref('')
const textarea = ref('')

// Form
const formRef = ref()
const formData = reactive({
  username: '',
  password: '',
  email: '',
  hobby: [] as string[]
})

const rules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, message: '密码长度不能少于 6 个字符', trigger: 'blur' }
  ],
  email: [
    { required: true, message: '请输入邮箱地址', trigger: 'blur' },
    { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' }
  ]
}

const submitForm = async () => {
  try {
    const valid = await formRef.value?.validate()
    if (valid) {
      console.log('表单数据:', formData)
      alert('提交成功！')
    }
  } catch (error) {
    console.log('验证失败:', error)
  }
}

const resetForm = () => {
  formRef.value?.resetFields()
}

interface TransferItem {
  key: number
  label: string
  disabled?: boolean
}

const transferData = ref<TransferItem[]>([
  { key: 1, label: '北京' },
  { key: 2, label: '上海' },
  { key: 3, label: '广州' },
  { key: 4, label: '深圳' },
  { key: 5, label: '杭州' },
  { key: 6, label: '成都', disabled: true }
])

const transferValue = ref<(string | number)[]>([2, 4])

const activeCollapse = ref<string[]>(['1'])
const activeAccordion = ref<string>('vue')

const initialCount = 15
const pageSize = 10
const maxItems = 50
const list = ref<number[]>(Array.from({ length: initialCount }, (_, idx) => idx + 1))
const loading = ref(false)

const loadMore = async () => {
  if (loading.value || list.value.length >= maxItems) return
  loading.value = true
  await new Promise(resolve => setTimeout(resolve, 800))

  const remaining = maxItems - list.value.length
  const count = Math.min(pageSize, remaining)
  const start = list.value.length
  const newItems = Array.from({ length: count }, (_, idx) => start + idx + 1)
  list.value = list.value.concat(newItems)

  loading.value = false
}

const resetInfinite = () => {
  list.value = Array.from({ length: initialCount }, (_, idx) => idx + 1)
  loading.value = false
}

// Icon
const iconClickMessage = ref('')

const handleIconClick = (iconName: string) => {
  iconClickMessage.value = `点击了 ${iconName} 图标`
  setTimeout(() => {
    iconClickMessage.value = ''
  }, 2000)
}
</script>

<style>
* {
  box-sizing: border-box;
}

body {
  margin: 0;
  padding: 0;
  background-color: #f5f5f5;
}
</style>

<style scoped>
.app {
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
}

h1 {
  font-size: 32px;
  color: #1890ff;
  margin-bottom: 40px;
  text-align: center;
}

.demo-section {
  background: #fff;
  border-radius: 8px;
  padding: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 24px;
}

.demo-section h2 {
  font-size: 24px;
  color: #333;
  margin-bottom: 24px;
  border-bottom: 2px solid #1890ff;
  padding-bottom: 8px;
}

.demo-item {
  margin-bottom: 32px;
}

.demo-item:last-child {
  margin-bottom: 0;
}

.demo-item h3 {
  font-size: 16px;
  color: #666;
  margin-bottom: 16px;
}

.demo-box {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px;
  background: #fafafa;
  border-radius: 4px;
  border: 1px solid #e8e8e8;
  flex-wrap: wrap;
}

.vc-transfer {
  margin-top: 16px;
}

.vc-collapse {
  background: #fff;
}

.infinite-list {
  height: 240px;
  overflow-y: auto;
  border: 1px solid #e8e8e8;
  border-radius: 4px;
  background-color: #fff;
  margin-bottom: 16px;
}

.infinite-list-item {
  padding: 12px 16px;
  border-bottom: 1px solid #f0f0f0;
  font-size: 14px;
  color: #606266;
}

.infinite-list-item:last-child {
  border-bottom: none;
}

.infinite-list-status {
  text-align: center;
  padding: 12px 0;
  color: #909399;
  font-size: 13px;
}

.icon-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 16px;
  padding: 16px;
}

.icon-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 16px;
  border: 1px solid #e8e8e8;
  border-radius: 4px;
  background-color: #fafafa;
  transition: all 0.3s ease;
  cursor: pointer;
}

.icon-item:hover {
  border-color: #409eff;
  background-color: #ecf5ff;
  transform: translateY(-2px);
  box-shadow: 0 2px 8px rgba(64, 158, 255, 0.2);
}

.icon-item span {
  margin-top: 8px;
  font-size: 12px;
  color: #606266;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
}

.bg-purple-dark {
  background: #99a9bf;
}

.bg-purple {
  background: #d3dce6;
}

.bg-purple-light {
  background: #e5e9f2;
}

.vc-row {
  margin-bottom: 20px;
}

.vc-row:last-child {
  margin-bottom: 0;
}

p {
  margin: 10px 0;
  color: #666;
}
</style>
