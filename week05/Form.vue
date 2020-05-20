<template>
  <div class="container">
    <div class="form">
      <label for="githubName" class="label">
        <span class="label-name">github 昵称:</span>
        <div class="input-block">
          <input id="githubName" type="text" name="githubName" class="input" />
        </div>
      </label>
      <label for="githubName" class="label">
        <span class="label-name">github Token:</span>
        <div class="input-block">
          <input
            id="githubToken"
            type="text"
            name="githubToken"
            class="input"
          />
        </div>
      </label>
      <label for="studentName" class="label">
        <span class="label-name">姓名:</span>
        <div class="input-block">
          <input
            id="studentName"
            type="text"
            name="studentName"
            class="input"
          />
        </div>
      </label>
    </div>
    <div>
      <label for="studentName">
        姓名：
        <input id="studentName" type="text" name="studentName" />
      </label>
    </div>
    <div>
      <label for="studentId">
        学号：
        <input id="studentId" type="text" name="studentId" />
      </label>
    </div>
    <div>
      <label for="classname">
        班级名称：
        <input id="classname" type="text" name="classname" />
      </label>
    </div>
    <div>
      <label for="gradename">
        组名称：
        <input id="gradename" type="text" name="gradename" />
      </label>
    </div>
  </div>
</template>
<style lang="scss" scoped>
* {
  box-sizing: border-box;
}
html,
body {
  padding: 0;
  margin: 0;
}
input {
  outline: none;
  border: none;
}
input:focus {
  outline: none;
  border: none;
}
@function pxToVw($px) {
  @return $px / 1980 * 100vw;
}
$minwidth: 0px;
$maxwidth: 100%;
:root {
  --input-after: #{$minwidth};
}
.container {
  width: 100vw;
  height: 100vh;
  .form {
    width: pxToVw(800);
    max-width: pxToVw(800);
    margin: pxToVw(100) auto 0;
    padding: pxToVw(30);
    border-radius: pxToVw(30);
    text-align: center;
    box-shadow: 3px 3px 12px gray;
    .label {
      font-family: 'Fira Sans', sans-serif;
      font-size: pxToVw(24);
      color: black;
      display: inline-block;
      margin-bottom: pxToVw(40);
      border-bottom: 2px solid lightgray;
      &:focus-within {
        --input-after: #{$maxwidth};
        &::after {
          content: ' ';
          position: absolute;
          left: 0;
          bottom: -2px;
          height: 2px;
          background-color: black;
          width: var(--input-after);
          transition: all 20s ease;
        }
      }
      &:last-child {
        margin-bottom: 0;
      }
      .label-name {
        text-align: left;
        display: inline-block;
        width: pxToVw(180);
        min-width: pxToVw(180);
        margin-right: pxToVw(20);
      }
      .input-block {
        display: inline-block;
        padding: pxToVw(5);
        min-width: pxToVw(300);
        position: relative;
        .input {
          padding: 0px;
          width: 100%;
          height: 100%;
        }
      }
    }
  }
}
@keyframes border-animation {
  0% {
    width: 0px;
  }
  100% {
    width: pxToVw(300);
  }
}
</style>
