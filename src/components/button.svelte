 
    <a href="#about-contact" class="btn-contact scrollto-contact-form"
        >CONTACT
    </a >
 

<style>
@import url(https://fonts.googleapis.com/css?family=Jura:300,400,500,600,700&subset=vietnamese);body.compensate-for-scrollbar {
    overflow: hidden
}

.fancybox-active {
    height: auto
}

.fancybox-is-hidden {
    left: -9999px;
    margin: 0;
    position: absolute!important;
    top: -9999px;
    visibility: hidden
}

.fancybox-container {
    -webkit-backface-visibility: hidden;
    height: 100%;
    left: 0;
    outline: none;
    position: fixed;
    -webkit-tap-highlight-color: transparent;
    top: 0;
    -ms-touch-action: manipulation;
    touch-action: manipulation;
    -webkit-transform: translateZ(0);
    transform: translateZ(0);
    width: 100%;
    z-index: 99992
}

.fancybox-container * {
    -webkit-box-sizing: border-box;
    box-sizing: border-box
}

.fancybox-bg,.fancybox-inner,.fancybox-outer,.fancybox-stage {
    bottom: 0;
    left: 0;
    position: absolute;
    right: 0;
    top: 0
}

.fancybox-outer {
    -webkit-overflow-scrolling: touch;
    overflow-y: auto
}

.fancybox-bg {
    background: #1e1e1e;
    opacity: 0;
    -webkit-transition-duration: inherit;
    transition-duration: inherit;
    -webkit-transition-property: opacity;
    transition-property: opacity;
    -webkit-transition-timing-function: cubic-bezier(.47,0,.74,.71);
    transition-timing-function: cubic-bezier(.47,0,.74,.71)
}

.fancybox-is-open .fancybox-bg {
    opacity: .9;
    -webkit-transition-timing-function: cubic-bezier(.22,.61,.36,1);
    transition-timing-function: cubic-bezier(.22,.61,.36,1)
}

.fancybox-caption,.fancybox-infobar,.fancybox-navigation .fancybox-button,.fancybox-toolbar {
    direction: ltr;
    opacity: 0;
    position: absolute;
    -webkit-transition: opacity .25s ease,visibility 0s ease .25s;
    transition: opacity .25s ease,visibility 0s ease .25s;
    visibility: hidden;
    z-index: 99997
}

.fancybox-show-caption .fancybox-caption,.fancybox-show-infobar .fancybox-infobar,.fancybox-show-nav .fancybox-navigation .fancybox-button,.fancybox-show-toolbar .fancybox-toolbar {
    opacity: 1;
    -webkit-transition: opacity .25s ease 0s,visibility 0s ease 0s;
    transition: opacity .25s ease 0s,visibility 0s ease 0s;
    visibility: visible
}

.fancybox-infobar {
    color: #ccc;
    font-size: 13px;
    -webkit-font-smoothing: subpixel-antialiased;
    height: 44px;
    left: 0;
    line-height: 44px;
    min-width: 44px;
    mix-blend-mode: difference;
    padding: 0 10px;
    pointer-events: none;
    top: 0;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none
}

.fancybox-toolbar {
    right: 0;
    top: 0
}

.fancybox-stage {
    direction: ltr;
    overflow: visible;
    -webkit-transform: translateZ(0);
    transform: translateZ(0);
    z-index: 99994
}

.fancybox-is-open .fancybox-stage {
    overflow: hidden
}

.fancybox-slide {
    -webkit-backface-visibility: hidden;
    display: none;
    height: 100%;
    left: 0;
    outline: none;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
    padding: 44px;
    position: absolute;
    text-align: center;
    top: 0;
    transition-property: opacity,-webkit-transform;
    -webkit-transition-property: opacity,-webkit-transform;
    transition-property: transform,opacity;
    transition-property: transform,opacity,-webkit-transform;
    white-space: normal;
    width: 100%;
    z-index: 99994
}

.fancybox-slide:before {
    content: "";
    display: inline-block;
    font-size: 0;
    height: 100%;
    vertical-align: middle;
    width: 0
}

.fancybox-is-sliding .fancybox-slide,.fancybox-slide--current,.fancybox-slide--next,.fancybox-slide--previous {
    display: block
}

.fancybox-slide--image {
    overflow: hidden;
    padding: 44px 0
}

.fancybox-slide--image:before {
    display: none
}

.fancybox-slide--html {
    padding: 6px
}

.fancybox-content {
    background: #fff;
    display: inline-block;
    margin: 0;
    max-width: 100%;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
    padding: 44px;
    position: relative;
    text-align: left;
    vertical-align: middle
}

.fancybox-slide--image .fancybox-content {
    -webkit-animation-timing-function: cubic-bezier(.5,0,.14,1);
    animation-timing-function: cubic-bezier(.5,0,.14,1);
    -webkit-backface-visibility: hidden;
    background: transparent;
    background-repeat: no-repeat;
    background-size: 100% 100%;
    left: 0;
    max-width: none;
    overflow: visible;
    padding: 0;
    position: absolute;
    top: 0;
    -webkit-transform-origin: top left;
    transform-origin: top left;
    transition-property: opacity,-webkit-transform;
    -webkit-transition-property: opacity,-webkit-transform;
    transition-property: transform,opacity;
    transition-property: transform,opacity,-webkit-transform;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    z-index: 99995
}

.fancybox-can-zoomOut .fancybox-content {
    cursor: -webkit-zoom-out;
    cursor: zoom-out
}

.fancybox-can-zoomIn .fancybox-content {
    cursor: -webkit-zoom-in;
    cursor: zoom-in
}

.fancybox-can-pan .fancybox-content,.fancybox-can-swipe .fancybox-content {
    cursor: -webkit-grab;
    cursor: grab
}

.fancybox-is-grabbing .fancybox-content {
    cursor: -webkit-grabbing;
    cursor: grabbing
}

.fancybox-container [data-selectable=true] {
    cursor: text
}

.fancybox-image,.fancybox-spaceball {
    background: transparent;
    border: 0;
    height: 100%;
    left: 0;
    margin: 0;
    max-height: none;
    max-width: none;
    padding: 0;
    position: absolute;
    top: 0;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    width: 100%
}

.fancybox-spaceball {
    z-index: 1
}

.fancybox-slide--iframe .fancybox-content,.fancybox-slide--map .fancybox-content,.fancybox-slide--pdf .fancybox-content,.fancybox-slide--video .fancybox-content {
    height: 100%;
    overflow: visible;
    padding: 0;
    width: 100%
}

.fancybox-slide--video .fancybox-content {
    background: #000
}

.fancybox-slide--map .fancybox-content {
    background: #e5e3df
}

.fancybox-slide--iframe .fancybox-content {
    background: #fff
}

.fancybox-iframe,.fancybox-video {
    background: transparent;
    border: 0;
    display: block;
    height: 100%;
    margin: 0;
    overflow: hidden;
    padding: 0;
    width: 100%
}

.fancybox-iframe {
    left: 0;
    position: absolute;
    top: 0
}

.fancybox-error {
    background: #fff;
    cursor: default;
    max-width: 400px;
    padding: 40px;
    width: 100%
}

.fancybox-error p {
    color: #444;
    font-size: 16px;
    line-height: 20px;
    margin: 0;
    padding: 0
}

.fancybox-button {
    background: rgba(30,30,30,.6);
    border: 0;
    border-radius: 0;
    -webkit-box-shadow: none;
    box-shadow: none;
    cursor: pointer;
    display: inline-block;
    height: 44px;
    margin: 0;
    padding: 10px;
    position: relative;
    -webkit-transition: color .2s;
    transition: color .2s;
    vertical-align: top;
    visibility: inherit;
    width: 44px
}

.fancybox-button,.fancybox-button:link,.fancybox-button:visited {
    color: #ccc
}

.fancybox-button:hover {
    color: #fff
}

.fancybox-button:focus {
    outline: none
}

.fancybox-button.fancybox-focus {
    outline: 1px dotted
}

.fancybox-button[disabled],.fancybox-button[disabled]:hover {
    color: #888;
    cursor: default;
    outline: none
}

.fancybox-button div {
    height: 100%
}

.fancybox-button svg {
    display: block;
    height: 100%;
    overflow: visible;
    position: relative;
    width: 100%
}

.fancybox-button svg path {
    fill: currentColor;
    stroke-width: 0
}

.fancybox-button--fsenter svg:nth-child(2),.fancybox-button--fsexit svg:first-child,.fancybox-button--pause svg:first-child,.fancybox-button--play svg:nth-child(2) {
    display: none
}

.fancybox-progress {
    background: #ff5268;
    height: 2px;
    left: 0;
    position: absolute;
    right: 0;
    top: 0;
    -webkit-transform: scaleX(0);
    transform: scaleX(0);
    -webkit-transform-origin: 0;
    transform-origin: 0;
    transition-property: -webkit-transform;
    -webkit-transition-property: -webkit-transform;
    transition-property: transform;
    transition-property: transform,-webkit-transform;
    -webkit-transition-timing-function: linear;
    transition-timing-function: linear;
    z-index: 99998
}

.fancybox-close-small {
    background: transparent;
    border: 0;
    border-radius: 0;
    color: #ccc;
    cursor: pointer;
    opacity: .8;
    padding: 8px;
    position: absolute;
    right: -12px;
    top: -44px;
    z-index: 401
}

.fancybox-close-small:hover {
    color: #fff;
    opacity: 1
}

.fancybox-slide--html .fancybox-close-small {
    color: currentColor;
    padding: 10px;
    right: 0;
    top: 0
}

.fancybox-slide--image.fancybox-is-scaling .fancybox-content {
    overflow: hidden
}

.fancybox-is-scaling .fancybox-close-small,.fancybox-is-zoomable.fancybox-can-pan .fancybox-close-small {
    display: none
}

.fancybox-navigation .fancybox-button {
    background-clip: content-box;
    height: 100px;
    opacity: 0;
    position: absolute;
    top: calc(50% - 50px);
    width: 70px
}

.fancybox-navigation .fancybox-button div {
    padding: 7px
}

.fancybox-navigation .fancybox-button--arrow_left {
    left: 0;
    padding: 31px 26px 31px 6px
}

.fancybox-navigation .fancybox-button--arrow_right {
    padding: 31px 6px 31px 26px;
    right: 0
}

.fancybox-caption {
    bottom: 0;
    color: #eee;
    font-size: 14px;
    font-weight: 400;
    left: 0;
    line-height: 1.5;
    padding: 25px 44px;
    right: 0;
    text-align: center;
    z-index: 99996
}

.fancybox-caption:before {
    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAD6CAQAAADKSeXYAAAAYklEQVQoz42RwQ3AMAgDjfcfup8WoRykfBAK5mQHKSz5rbXJPis1hjiV3CIqgG0hLZPkVkA4p4x5oR1bVeDrdCLrW2Q0D5bcwY3TGMHbdw3mPRuOtaspYP1w//G1OIcW148H0DMCqI/3mMMAAAAASUVORK5CYII=);
    background-repeat: repeat-x;
    background-size: contain;
    bottom: 0;
    content: "";
    display: block;
    left: 0;
    pointer-events: none;
    position: absolute;
    right: 0;
    top: -44px;
    z-index: -1
}

.fancybox-caption a,.fancybox-caption a:link,.fancybox-caption a:visited {
    color: #ccc;
    text-decoration: none
}

.fancybox-caption a:hover {
    color: #fff;
    text-decoration: underline
}

.fancybox-loading {
    -webkit-animation: fancybox-rotate 1s linear infinite;
    animation: fancybox-rotate 1s linear infinite;
    background: transparent;
    border: 4px solid #888;
    border-bottom-color: #fff;
    border-radius: 50%;
    height: 50px;
    left: 50%;
    margin: -25px 0 0 -25px;
    opacity: .7;
    padding: 0;
    position: absolute;
    top: 50%;
    width: 50px;
    z-index: 99999
}

@-webkit-keyframes fancybox-rotate {
    to {
        -webkit-transform: rotate(1turn);
        transform: rotate(1turn)
    }
}

@keyframes fancybox-rotate {
    to {
        -webkit-transform: rotate(1turn);
        transform: rotate(1turn)
    }
}

.fancybox-animated {
    -webkit-transition-timing-function: cubic-bezier(0,0,.25,1);
    transition-timing-function: cubic-bezier(0,0,.25,1)
}

.fancybox-fx-slide.fancybox-slide--previous {
    opacity: 0;
    -webkit-transform: translate3d(-100%,0,0);
    transform: translate3d(-100%,0,0)
}

.fancybox-fx-slide.fancybox-slide--next {
    opacity: 0;
    -webkit-transform: translate3d(100%,0,0);
    transform: translate3d(100%,0,0)
}

.fancybox-fx-slide.fancybox-slide--current {
    opacity: 1;
    -webkit-transform: translateZ(0);
    transform: translateZ(0)
}

.fancybox-fx-fade.fancybox-slide--next,.fancybox-fx-fade.fancybox-slide--previous {
    opacity: 0;
    -webkit-transition-timing-function: cubic-bezier(.19,1,.22,1);
    transition-timing-function: cubic-bezier(.19,1,.22,1)
}

.fancybox-fx-fade.fancybox-slide--current {
    opacity: 1
}

.fancybox-fx-zoom-in-out.fancybox-slide--previous {
    opacity: 0;
    -webkit-transform: scale3d(1.5,1.5,1.5);
    transform: scale3d(1.5,1.5,1.5)
}

.fancybox-fx-zoom-in-out.fancybox-slide--next {
    opacity: 0;
    -webkit-transform: scale3d(.5,.5,.5);
    transform: scale3d(.5,.5,.5)
}

.fancybox-fx-zoom-in-out.fancybox-slide--current {
    opacity: 1;
    -webkit-transform: scaleX(1);
    transform: scaleX(1)
}

.fancybox-fx-rotate.fancybox-slide--previous {
    opacity: 0;
    -webkit-transform: rotate(-1turn);
    transform: rotate(-1turn)
}

.fancybox-fx-rotate.fancybox-slide--next {
    opacity: 0;
    -webkit-transform: rotate(1turn);
    transform: rotate(1turn)
}

.fancybox-fx-rotate.fancybox-slide--current {
    opacity: 1;
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg)
}

.fancybox-fx-circular.fancybox-slide--previous {
    opacity: 0;
    -webkit-transform: scale3d(0,0,0) translate3d(-100%,0,0);
    transform: scale3d(0,0,0) translate3d(-100%,0,0)
}

.fancybox-fx-circular.fancybox-slide--next {
    opacity: 0;
    -webkit-transform: scale3d(0,0,0) translate3d(100%,0,0);
    transform: scale3d(0,0,0) translate3d(100%,0,0)
}

.fancybox-fx-circular.fancybox-slide--current {
    opacity: 1;
    -webkit-transform: scaleX(1) translateZ(0);
    transform: scaleX(1) translateZ(0)
}

.fancybox-fx-tube.fancybox-slide--previous {
    -webkit-transform: translate3d(-100%,0,0) scale(.1) skew(-10deg);
    transform: translate3d(-100%,0,0) scale(.1) skew(-10deg)
}

.fancybox-fx-tube.fancybox-slide--next {
    -webkit-transform: translate3d(100%,0,0) scale(.1) skew(10deg);
    transform: translate3d(100%,0,0) scale(.1) skew(10deg)
}

.fancybox-fx-tube.fancybox-slide--current {
    -webkit-transform: translateZ(0) scale(1);
    transform: translateZ(0) scale(1)
}

@media (max-height: 576px) {
    .fancybox-caption {
        padding:12px
    }

    .fancybox-slide {
        padding-left: 6px;
        padding-right: 6px
    }

    .fancybox-slide--image {
        padding: 6px 0
    }

    .fancybox-close-small {
        right: -6px
    }

    .fancybox-slide--image .fancybox-close-small {
        background: #4e4e4e;
        color: #f2f4f6;
        height: 36px;
        opacity: 1;
        padding: 6px;
        right: 0;
        top: 0;
        width: 36px
    }
}

.fancybox-share {
    background: #f4f4f4;
    border-radius: 3px;
    max-width: 90%;
    padding: 30px;
    text-align: center
}

.fancybox-share h1 {
    color: #222;
    font-size: 35px;
    font-weight: 700;
    margin: 0 0 20px
}

.fancybox-share p {
    margin: 0;
    padding: 0
}

.fancybox-share__button {
    border: 0;
    border-radius: 3px;
    display: inline-block;
    font-size: 14px;
    font-weight: 700;
    line-height: 40px;
    margin: 0 5px 10px;
    min-width: 130px;
    padding: 0 15px;
    text-decoration: none;
    -webkit-transition: all .2s;
    transition: all .2s;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    white-space: nowrap
}

.fancybox-share__button:link,.fancybox-share__button:visited {
    color: #fff
}

.fancybox-share__button:hover {
    text-decoration: none
}

.fancybox-share__button--fb {
    background: #3b5998
}

.fancybox-share__button--fb:hover {
    background: #344e86
}

.fancybox-share__button--pt {
    background: #bd081d
}

.fancybox-share__button--pt:hover {
    background: #aa0719
}

.fancybox-share__button--tw {
    background: #1da1f2
}

.fancybox-share__button--tw:hover {
    background: #0d95e8
}

.fancybox-share__button svg {
    height: 25px;
    margin-right: 7px;
    position: relative;
    top: -1px;
    vertical-align: middle;
    width: 25px
}

.fancybox-share__button svg path {
    fill: #fff
}

.fancybox-share__input {
    background: transparent;
    border: 0;
    border-bottom: 1px solid #d7d7d7;
    border-radius: 0;
    color: #5d5b5b;
    font-size: 14px;
    margin: 10px 0 0;
    outline: none;
    padding: 10px 15px;
    width: 100%
}

.fancybox-thumbs {
    background: #ddd;
    bottom: 0;
    display: none;
    margin: 0;
    -webkit-overflow-scrolling: touch;
    -ms-overflow-style: -ms-autohiding-scrollbar;
    padding: 2px 2px 4px;
    position: absolute;
    right: 0;
    -webkit-tap-highlight-color: transparent;
    top: 0;
    width: 212px;
    z-index: 99995
}

.fancybox-thumbs-x {
    overflow-x: auto;
    overflow-y: hidden
}

.fancybox-show-thumbs .fancybox-thumbs {
    display: block
}

.fancybox-show-thumbs .fancybox-inner {
    right: 212px
}

.fancybox-thumbs__list {
    font-size: 0;
    height: 100%;
    list-style: none;
    margin: 0;
    overflow-x: hidden;
    overflow-y: auto;
    padding: 0;
    position: absolute;
    position: relative;
    white-space: nowrap;
    width: 100%
}

.fancybox-thumbs-x .fancybox-thumbs__list {
    overflow: hidden
}

.fancybox-thumbs-y .fancybox-thumbs__list::-webkit-scrollbar {
    width: 7px
}

.fancybox-thumbs-y .fancybox-thumbs__list::-webkit-scrollbar-track {
    background: #fff;
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
    box-shadow: inset 0 0 6px rgba(0,0,0,.3)
}

.fancybox-thumbs-y .fancybox-thumbs__list::-webkit-scrollbar-thumb {
    background: #2a2a2a;
    border-radius: 10px
}

.fancybox-thumbs__list a {
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    background-color: rgba(0,0,0,.1);
    background-position: 50%;
    background-repeat: no-repeat;
    background-size: cover;
    cursor: pointer;
    float: left;
    height: 75px;
    margin: 2px;
    max-height: calc(100% - 8px);
    max-width: calc(50% - 4px);
    outline: none;
    overflow: hidden;
    padding: 0;
    position: relative;
    -webkit-tap-highlight-color: transparent;
    width: 100px
}

.fancybox-thumbs__list a:before {
    border: 6px solid #ff5268;
    bottom: 0;
    content: "";
    left: 0;
    opacity: 0;
    position: absolute;
    right: 0;
    top: 0;
    -webkit-transition: all .2s cubic-bezier(.25,.46,.45,.94);
    transition: all .2s cubic-bezier(.25,.46,.45,.94);
    z-index: 99991
}

.fancybox-thumbs__list a:focus:before {
    opacity: .5
}

.fancybox-thumbs__list a.fancybox-thumbs-active:before {
    opacity: 1
}

@media (max-width: 576px) {
    .fancybox-thumbs {
        width:110px
    }

    .fancybox-show-thumbs .fancybox-inner {
        right: 110px
    }

    .fancybox-thumbs__list a {
        max-width: calc(100% - 10px)
    }
}

.iziToast-capsule {
    font-size: 0;
    height: 0;
    width: 100%;
    -webkit-transform: translateZ(0);
    transform: translateZ(0);
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    -webkit-transition: height .5s cubic-bezier(.25,.8,.25,1),-webkit-transform .5s cubic-bezier(.25,.8,.25,1);
    transition: height .5s cubic-bezier(.25,.8,.25,1),-webkit-transform .5s cubic-bezier(.25,.8,.25,1);
    transition: transform .5s cubic-bezier(.25,.8,.25,1),height .5s cubic-bezier(.25,.8,.25,1);
    transition: transform .5s cubic-bezier(.25,.8,.25,1),height .5s cubic-bezier(.25,.8,.25,1),-webkit-transform .5s cubic-bezier(.25,.8,.25,1)
}

.iziToast-capsule,.iziToast-capsule * {
    -webkit-box-sizing: border-box;
    box-sizing: border-box
}

.iziToast-overlay {
    display: block;
    position: fixed;
    top: -100px;
    left: 0;
    right: 0;
    bottom: -100px;
    z-index: 997
}

.iziToast {
    display: inline-block;
    clear: both;
    position: relative;
    font-family: Lato,Tahoma,Arial;
    font-size: 14px;
    padding: 8px 45px 9px 0;
    background: hsla(0,0%,93%,.9);
    border-color: hsla(0,0%,93%,.9);
    width: 100%;
    pointer-events: all;
    cursor: default;
    -webkit-transform: translateX(0);
    transform: translateX(0);
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    min-height: 54px
}

.iziToast>.iziToast-progressbar {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    z-index: 1;
    background: hsla(0,0%,100%,.2)
}

.iziToast>.iziToast-progressbar>div {
    height: 2px;
    width: 100%;
    background: rgba(0,0,0,.3);
    border-radius: 0 0 3px 3px
}

.iziToast.iziToast-balloon:before {
    content: "";
    position: absolute;
    right: 8px;
    left: auto;
    width: 0;
    height: 0;
    top: 100%;
    border-right: 0 solid transparent;
    border-left: 15px solid transparent;
    border-top: 10px solid #000;
    border-top-color: inherit;
    border-radius: 0
}

.iziToast.iziToast-balloon .iziToast-progressbar {
    top: 0;
    bottom: auto
}

.iziToast.iziToast-balloon>div {
    border-radius: 0 0 0 3px
}

.iziToast>.iziToast-cover {
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    height: 100%;
    margin: 0;
    background-size: 100%;
    background-position: 50% 50%;
    background-repeat: no-repeat;
    background-color: rgba(0,0,0,.1)
}

.iziToast>.iziToast-close {
    position: absolute;
    right: 0;
    top: 0;
    border: 0;
    padding: 0;
    opacity: .6;
    width: 42px;
    height: 100%;
    background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAJPAAACTwBcGfW0QAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAD3SURBVFiF1ZdtDoMgDEBfdi4PwAX8vLFn0qT7wxantojKupmQmCi8R4tSACpgjC2ICCUbEBa8ingjsU1AXRBeR8aLN64FiknswN8CYefBBDQ3whuFESy7WyQMeC0ipEI0A+0FeBvHUFN8xPaUhAH/iKoWsnXHGegy4J0yxialOfaHJAz4bhRzQzgDvdGnz4GbAonZbCQMuBm1K/kcFu8Mp1N2cFFpsxsMuJqqbIGExGl4loARajU1twskJLLhIsID7+tvUoDnIjTg5T9DPH9EBrz8rxjPzciAl9+O8SxI8CzJ8CxKFfh3ynK8Dyb8wNHM/XDqejx/AtNyPO87tNybAAAAAElFTkSuQmCC") no-repeat 50% 50%;
    background-size: 8px;
    cursor: pointer;
    outline: none
}

.iziToast>.iziToast-close:hover {
    opacity: 1
}

.iziToast>.iziToast-body {
    position: relative;
    padding: 0 0 0 10px;
    height: auto;
    min-height: 36px;
    margin: 0 0 0 15px;
    text-align: left
}

.iziToast>.iziToast-body:after {
    content: "";
    display: table;
    clear: both
}

.iziToast>.iziToast-body .iziToast-texts {
    margin: 10px 0 0;
    padding-right: 2px;
    display: inline-block;
    float: left
}

.iziToast>.iziToast-body .iziToast-inputs {
    min-height: 19px;
    float: left;
    margin: 3px -2px
}

.iziToast>.iziToast-body .iziToast-inputs>input:not([type=checkbox]):not([type=radio]),.iziToast>.iziToast-body .iziToast-inputs>select {
    position: relative;
    display: inline-block;
    margin: 2px;
    border-radius: 2px;
    border: 0;
    padding: 4px 7px;
    font-size: 13px;
    letter-spacing: .02em;
    background: rgba(0,0,0,.1);
    color: #000;
    -webkit-box-shadow: 0 0 0 1px rgba(0,0,0,.2);
    box-shadow: 0 0 0 1px rgba(0,0,0,.2);
    min-height: 26px
}

.iziToast>.iziToast-body .iziToast-inputs>input:not([type=checkbox]):not([type=radio]):focus,.iziToast>.iziToast-body .iziToast-inputs>select:focus {
    -webkit-box-shadow: 0 0 0 1px rgba(0,0,0,.6);
    box-shadow: 0 0 0 1px rgba(0,0,0,.6)
}

.iziToast>.iziToast-body .iziToast-buttons {
    min-height: 17px;
    float: left;
    margin: 4px -2px
}

.iziToast>.iziToast-body .iziToast-buttons>a,.iziToast>.iziToast-body .iziToast-buttons>button,.iziToast>.iziToast-body .iziToast-buttons>input:not([type=checkbox]):not([type=radio]) {
    position: relative;
    display: inline-block;
    margin: 2px;
    border-radius: 2px;
    border: 0;
    padding: 5px 10px;
    font-size: 12px;
    letter-spacing: .02em;
    cursor: pointer;
    background: rgba(0,0,0,.1);
    color: #000
}

.iziToast>.iziToast-body .iziToast-buttons>a:hover,.iziToast>.iziToast-body .iziToast-buttons>button:hover,.iziToast>.iziToast-body .iziToast-buttons>input:not([type=checkbox]):not([type=radio]):hover {
    background: rgba(0,0,0,.2)
}

.iziToast>.iziToast-body .iziToast-buttons>a:focus,.iziToast>.iziToast-body .iziToast-buttons>button:focus,.iziToast>.iziToast-body .iziToast-buttons>input:not([type=checkbox]):not([type=radio]):focus {
    -webkit-box-shadow: 0 0 0 1px rgba(0,0,0,.6);
    box-shadow: 0 0 0 1px rgba(0,0,0,.6)
}

.iziToast>.iziToast-body .iziToast-buttons>a:active,.iziToast>.iziToast-body .iziToast-buttons>button:active,.iziToast>.iziToast-body .iziToast-buttons>input:not([type=checkbox]):not([type=radio]):active {
    top: 1px
}

.iziToast>.iziToast-body .iziToast-icon {
    height: 100%;
    position: absolute;
    left: 0;
    top: 50%;
    display: table;
    font-size: 23px;
    line-height: 24px;
    margin-top: -12px;
    color: #000;
    width: 24px;
    height: 24px
}

.iziToast>.iziToast-body .iziToast-icon.ico-info {
    background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAMAAACdt4HsAAAAflBMVEUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACCtoPsAAAAKXRSTlMA6PsIvDob+OapavVhWRYPrIry2MxGQ97czsOzpJaMcE0qJQOwVtKjfxCVFeIAAAI3SURBVFjDlJPZsoIwEETnCiGyb8q+qmjl/3/wFmGKwjBROS9QWbtnOqDDGPq4MdMkSc0m7gcDDhF4NRdv8NoL4EcMpzoJglPl/KTDz4WW3IdvXEvxkfIKn7BMZb1bFK4yZFqghZ03jk0nG8N5NBwzx9xU5cxAg8fXi20/hDdC316lcA8o7t16eRuQvW1XGd2d2P8QSHQDDbdIII/9CR3lUF+lbucfJy4WfMS64EJPORnrZxtfc2pjJdnbuags3l04TTtJMXrdTph4Pyg4XAjugAJqMDf5Rf+oXx2/qi4u6nipakIi7CsgiuMSEF9IGKg8heQJKkxIfFSUU/egWSwNrS1fPDtLfon8sZOcYUQml1Qv9a3kfwsEUyJEMgFBKzdV8o3Iw9yAjg1jdLQCV4qbd3no8yD2GugaC3oMbF0NYHCpJYSDhNI5N2DAWB4F4z9Aj/04Cna/x7eVAQ17vRjQZPh+G/kddYv0h49yY4NWNDWMMOMUIRYvlTECmrN8pUAjo5RCMn8KoPmbJ/+Appgnk//Sy90GYBCGgm7IAskQ7D9hFKW4ApB1ei3FSYD9PjGAKygAV+ARFYBH5BsVgG9kkBSAQWKUFYBRZpkUgGVinRWAdUZQDABBQdIcAElDVBUAUUXWHQBZx1gMAGMprM0AsLbVXHsA5trZe93/wp3svQ0YNb/jWV3AIOLsMtlznSNOH7JqjOpDVh7z8qCZR10ftvO4nxeOvPLkpSuvfXnxzKtvXr7j+v8C5ii0e71At7cAAAAASUVORK5CYII=") no-repeat 50% 50%;
    background-size: 85%
}

.iziToast>.iziToast-body .iziToast-icon.ico-warning {
    background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEQAAABECAMAAAAPzWOAAAAAkFBMVEUAAAAAAAABAAIAAAABAAIAAAMAAAABAAIBAAIBAAIAAAIAAAABAAIAAAABAAICAAICAAIAAAIAAAAAAAAAAAABAAIBAAIAAAMAAAABAAIBAAMBAAECAAIAAAIAAAIAAAABAAIBAAIBAAMBAAIBAAEAAAIAAAMAAAAAAAABAAECAAICAAIAAAIAAAMAAAQAAAE05yNAAAAAL3RSTlMAB+kD7V8Q+PXicwv7I9iYhkAzJxnx01IV5cmnk2xmHfzexsK4eEw5L7Gei39aRw640awAAAHQSURBVFjD7ZfJdoJAEEWJgCiI4oDiPM8m7///LidErRO7sHrY5u7YXLr7vKqu9kTC0HPmo9n8cJbEQOzqqAdAUHeUZACQuTkGDQBoDJwkHZR0XBz9FkpafXuHP0SJ09mGeJLZ5wwlTmcbA0THPmdEK7XPGTG1zxmInn3OiJ19zkB0jSVTKExMHT0wjAwlWzC0fSPHF1gWRpIhWMYm7fYTFcQGlbemf4dFfdTGg0B/KXM8qBU/3wntbq7rSGqvJ9kla6IpueFJet8fxfem5yhykjyOgNaWF1qSGd5JMNNxpNF7SZQaVh5JzLrTCZIEJ1GyEyVyd+pClMjdaSJK5O40giSRu5PfFiVyd1pAksjdKRnrSsbVdbiHrgT7yss315fkVQPLFQrL+4FHeOXKO5YRFEKv5AiFaMlKLlBpJuVCJlC5sJfvCgztru/3NmBYccPgGTxRAzxn1XGEMUf58pXZvjoOsOCgjL08+b53mtfAM/SVsZcjKLtysQZPqIy9HPP3m/3zKItRwT0LyQo8sTr26tcO83DIUMWIJjierHLsJda/tbNBFY0BP/bKtcM8HNIWCK3aYR4OMzgxo5w5EFLOLKDExXAm9gI4E3iAO94/Ct/lKWuM2LMGbgAAAABJRU5ErkJggg==") no-repeat 50% 50%;
    background-size: 85%
}

.iziToast>.iziToast-body .iziToast-icon.ico-error {
    background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAMAAACdt4HsAAAAeFBMVEUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAVyEiIAAAAJ3RSTlMA3BsB98QV8uSyWVUFz7+kcWMM2LuZioBpTUVBNcq2qaibj4d1azLZZYABAAACZElEQVRYw7WX25KCMAyGAxUoFDkpiohnV97/DXeGBtoOUprZ2dyo1K82fxKbwJJVp+KQZ7so2mX5oThVQLKwjDe9YZu4DF3ptAn6rxY0qQPOEq9fNC9ha3y77a22ba24v+9Xbe8v8x03dPOC2/NdvB6xeSreLfGJpnx0TyotKqLm2s7Jd/WO6ivXNp0tCy02R/aFz5VQ5wUPlUL5fIfj5KIlVGU0nWHm/5QtoTVMWY8mzIVu1K9O7XH2JiU/xnOOT39gnUfj+lFHddx4tFjL3/H8jjzaFCy2Rf0c/fdQyQszI8BDR973IyMSKa4krjxAiW/lkRvMP+bKK9WbYS1ASQg8dKjaUGlYPwRe/WoIkz8tiQchH5QAEMv6T0k8MD4mUyWr4E7jAWqZ+xWcMIYkXvlwggJ3IvFK+wIOcpXAo8n8P0COAaXyKH4OsjBuZB4ew0IGu+H1SebhNazsQBbWm8yj+hFuUJB5eMsN0IUXmYendAFFfJB5uEkRMYwxmcd6zDGRtmQePEykAgubymMRFmMxCSIPCRbTuFNN5OGORTjmNGc0Po0m8Uv0gcCry6xUhR2QeLii9tofbEfhz/qvNti+OfPqNm2Mq6105FUMvdT4GPmufMiV8PqBMkc+DdT1bjYYbjzU/ew23VP4n3mLAz4n8Jtv/Ui3ceTT2mzz5o1mZt0gnBpmsdjqRqVlmplcPdqa7X23kL9brdm2t/uBYDPn2+tyu48mtIGD10JTuUrukVrbCFiwDzcHrPjxKt7PW+AZQyT/WESO+1WL7f3o+WLHL2dYMSZsg6dg/z360ofvP4//v1NPzgs28WlWAAAAAElFTkSuQmCC") no-repeat 50% 50%;
    background-size: 80%
}

.iziToast>.iziToast-body .iziToast-icon.ico-success {
    background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABABAMAAABYR2ztAAAAIVBMVEUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABt0UjBAAAACnRSTlMApAPhIFn82wgGv8mVtwAAAKVJREFUSMft0LEJAkEARNFFFEw1NFJb8CKjAy1AEOzAxNw+bEEEg6nyFjbY4LOzcBwX7S/gwUxoTdIn+Jbv4Lv8bx446+kB6VsBtK0B+wbMCKxrwL33wOrVeeChX28n7KTOTjgoEu6DRSYAgAAAAkAmAIAAAAIACQIkMkACAAgAIACAyECBKAOJuCagTJwSUCaUAEMAABEBRwAAEQFLbCJgO4bW+AZKGnktR+jAFAAAAABJRU5ErkJggg==") no-repeat 50% 50%;
    background-size: 85%
}

.iziToast>.iziToast-body .iziToast-icon.ico-question {
    background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAQAAAAAYLlVAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QAAKqNIzIAAAAJcEhZcwAADdcAAA3XAUIom3gAAAAHdElNRQfhCQkUEhFovxTxAAAEDklEQVRo3s2ZTWgTQRTHf03ipTRUqghNSgsRjHgQrFUQC6JgD1Kak3gQUUoPqRdBglf1oBehBws9Cn4cGk+1SOmh2upBxAYVoeJHrR9tgq0i1Cq0lqYeks7MbpPdmU00/c8hm9n33v/t7Nt5M2+qMEWQI0QIibZKRrQpHvLL2KI2wnQzzBKrDm2RIeKEy01dTYKUI7G1ZRknQXV5yP10kTYgly1NF/5S6duZ8ES+1iZodyaocrjXxE0OFeifYYgp0mRIkwFChAkRJsIxGgrIP+I0n82fvZW5dc/zkss0O2o1c5mX6/TmaDWl77RFe5YkUW3tKEmyFv0lOvXJ/fTYnmCEFuMRbGHEZqVHLyT9DFjUJmkzJl9DG5MWWwM6Llif/gF1nukB6nhgGwUXdFrE+wiURA8QoM9i0zEWWpXQW+ZsyeRrOMuyEo5Fv4gmy4dXPvqcC+pH2VRYaMwy+OWG+iLGCgm0W0Kv9HdvR8ASjmKCXpuK/bxiV/76A/v5UdDIZuKcJGjrnec5KZ7wwsWFOp6xPX/9mt2sqDe7FO+Kf/fXHBPPDWpdXGhTpLvUG9VKwh1xMDDjkvu+cNDFBTk7ptX1QkKZ850m3duu6fcrWxwdaFFyREJ2j4vOpKP6Du6z4uJCv8sYJIVkCnJBGGZaBONO3roY2EqNrSfIPi7SKP4fdXyNUd6I6wbSAHEl33tFLe+FlSsusnK90A0+oEPcuufZgXnOi+u9LrKSJQZQw6LwqBnv2CKsfHORbFbyQhA6xN/pEuihSdj56Co7LWRjPiKie6gkB2LiKuUqK5kiPkLiz1QJ9K1cNXBAMoUCigNpQ9IqDtMI1HKA4/jyvUsaoSyZLA5kjOjDPFZen8Ql5TsvBskUgjciIPSX3QAXC86DT7VWvlEh/xZ+ij9BDVWJ0QL0SbZq6QaFxoLPcXPmBLveLCc4wXdDK6s+6/vwhCSniFLPXW0NJe5UB8zKCsviqpc7vGPVQFcyZbyPwGD+d5ZnxmNWlhG4xSBZZjivjIWHEQgoDkSMjMwTo54569JSE5IpA7EyJSMTyGTUAUFlO1ZKOtaHTMeL1PhYYFTcihmY2cQ5+ullj7EDkiVfVez2sCTz8yiv84djhg7IJVk81xFWJlPdfHBG0flkRC/zQFZ+DSllNtfDdUsOMCliyGX5uOzU3ZhIXFDof4m1gDuKbEx0t2YS25gVGpcMnr/I1kx3c6piB8P8ZoqEwfMX3ZyCXynJTmq/U7NUXqfUzCbWL1wqVKBQUeESzQYoUlW8TAcVL1RCxUu1G6BYXfFyfQ4VPbDI4T8d2WzgQ6sc/vmxnTsqfHCZQzUJxm1h5dxS5Tu6lQgTZ0ipqRVqSwzTbbLHMt+c19iO76tsx/cLZub+Ali+tYC93olEAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDE3LTA5LTA5VDIwOjE4OjE3KzAyOjAwjKtfjgAAACV0RVh0ZGF0ZTptb2RpZnkAMjAxNy0wOS0wOVQyMDoxODoxNyswMjowMP325zIAAAAZdEVYdFNvZnR3YXJlAHd3dy5pbmtzY2FwZS5vcmeb7jwaAAAAAElFTkSuQmCC") no-repeat 50% 50%;
    background-size: 85%
}

.iziToast>.iziToast-body .iziToast-title {
    margin: 0;
    color: #000
}

.iziToast>.iziToast-body .iziToast-message,.iziToast>.iziToast-body .iziToast-title {
    padding: 0;
    line-height: 16px;
    font-size: 14px;
    text-align: left;
    float: left;
    white-space: normal
}

.iziToast>.iziToast-body .iziToast-message {
    margin: 0 0 10px;
    color: rgba(0,0,0,.6)
}

.iziToast.iziToast-animateInside .iziToast-buttons-child,.iziToast.iziToast-animateInside .iziToast-icon,.iziToast.iziToast-animateInside .iziToast-inputs-child,.iziToast.iziToast-animateInside .iziToast-message,.iziToast.iziToast-animateInside .iziToast-title {
    opacity: 0
}

.iziToast-target {
    position: relative;
    width: 100%;
    margin: 0 auto
}

.iziToast-target .iziToast-capsule {
    overflow: hidden
}

.iziToast-target .iziToast-capsule:after {
    visibility: hidden;
    display: block;
    font-size: 0;
    content: " ";
    clear: both;
    height: 0
}

.iziToast-target .iziToast-capsule .iziToast {
    width: 100%;
    float: left
}

.iziToast-wrapper {
    z-index: 99999;
    position: fixed;
    width: 100%;
    pointer-events: none;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column
}

.iziToast-wrapper .iziToast.iziToast-balloon:before {
    border-right: 0 solid transparent;
    border-left: 15px solid transparent;
    border-top: 10px solid #000;
    border-top-color: inherit;
    right: 8px;
    left: auto
}

.iziToast-wrapper-bottomLeft {
    left: 0;
    bottom: 0;
    text-align: left
}

.iziToast-wrapper-bottomLeft .iziToast.iziToast-balloon:before {
    border-right: 15px solid transparent;
    border-left: 0 solid transparent;
    right: auto;
    left: 8px
}

.iziToast-wrapper-bottomRight {
    right: 0;
    bottom: 0;
    text-align: right
}

.iziToast-wrapper-topLeft {
    left: 0;
    top: 0;
    text-align: left
}

.iziToast-wrapper-topLeft .iziToast.iziToast-balloon:before {
    border-right: 15px solid transparent;
    border-left: 0 solid transparent;
    right: auto;
    left: 8px
}

.iziToast-wrapper-topRight {
    top: 0;
    right: 0;
    text-align: right
}

.iziToast-wrapper-topCenter {
    top: 0;
    left: 0;
    right: 0;
    text-align: center
}

.iziToast-wrapper-bottomCenter,.iziToast-wrapper-center {
    bottom: 0;
    left: 0;
    right: 0;
    text-align: center
}

.iziToast-wrapper-center {
    top: 0;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-flow: column;
    flex-flow: column;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center
}

.iziToast-rtl {
    direction: rtl;
    padding: 8px 0 9px 45px;
    font-family: Tahoma,Lato,Arial
}

.iziToast-rtl .iziToast-cover {
    left: auto;
    right: 0
}

.iziToast-rtl .iziToast-close {
    right: auto;
    left: 0
}

.iziToast-rtl .iziToast-body {
    padding: 0 10px 0 0;
    margin: 0 16px 0 0;
    text-align: right
}

.iziToast-rtl .iziToast-body .iziToast-buttons,.iziToast-rtl .iziToast-body .iziToast-inputs,.iziToast-rtl .iziToast-body .iziToast-message,.iziToast-rtl .iziToast-body .iziToast-texts,.iziToast-rtl .iziToast-body .iziToast-title {
    float: right;
    text-align: right
}

.iziToast-rtl .iziToast-body .iziToast-icon {
    left: auto;
    right: 0
}

@media only screen and (min-width: 568px) {
    .iziToast-wrapper {
        padding:10px 15px
    }

    .iziToast {
        margin: 5px 0;
        border-radius: 3px;
        width: auto
    }

    .iziToast:after {
        content: "";
        z-index: -1;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        border-radius: 3px;
        -webkit-box-shadow: inset 0 -10px 20px -10px rgba(0,0,0,.2),inset 0 0 5px rgba(0,0,0,.1),0 8px 8px -5px rgba(0,0,0,.25);
        box-shadow: inset 0 -10px 20px -10px rgba(0,0,0,.2),inset 0 0 5px rgba(0,0,0,.1),0 8px 8px -5px rgba(0,0,0,.25)
    }

    .iziToast:not(.iziToast-rtl) .iziToast-cover {
        border-radius: 3px 0 0 3px
    }

    .iziToast.iziToast-rtl .iziToast-cover {
        border-radius: 0 3px 3px 0
    }

    .iziToast.iziToast-color-dark:after {
        -webkit-box-shadow: inset 0 -10px 20px -10px hsla(0,0%,100%,.3),0 10px 10px -5px rgba(0,0,0,.25);
        box-shadow: inset 0 -10px 20px -10px hsla(0,0%,100%,.3),0 10px 10px -5px rgba(0,0,0,.25)
    }

    .iziToast.iziToast-balloon .iziToast-progressbar {
        background: transparent
    }

    .iziToast.iziToast-balloon:after {
        -webkit-box-shadow: 0 10px 10px -5px rgba(0,0,0,.25),inset 0 10px 20px -5px rgba(0,0,0,.25);
        box-shadow: 0 10px 10px -5px rgba(0,0,0,.25),inset 0 10px 20px -5px rgba(0,0,0,.25)
    }

    .iziToast-target .iziToast:after {
        -webkit-box-shadow: inset 0 -10px 20px -10px rgba(0,0,0,.2),inset 0 0 5px rgba(0,0,0,.1);
        box-shadow: inset 0 -10px 20px -10px rgba(0,0,0,.2),inset 0 0 5px rgba(0,0,0,.1)
    }
}

.iziToast.iziToast-theme-dark {
    background: #565c70;
    border-color: #565c70
}

.iziToast.iziToast-theme-dark .iziToast-title {
    color: #fff
}

.iziToast.iziToast-theme-dark .iziToast-message {
    color: hsla(0,0%,100%,.7);
    font-weight: 300
}

.iziToast.iziToast-theme-dark .iziToast-close {
    background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAQAAADZc7J/AAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QAAKqNIzIAAAAJcEhZcwAADdcAAA3XAUIom3gAAAAHdElNRQfgCR4OIQIPSao6AAAAwElEQVRIx72VUQ6EIAwFmz2XB+AConhjzqTJ7JeGKhLYlyx/BGdoBVpjIpMJNjgIZDKTkQHYmYfwmR2AfAqGFBcO2QjXZCd24bEggvd1KBx+xlwoDpYmvnBUUy68DYXD77ESr8WDtYqvxRex7a8oHP4Wo1Mkt5I68Mc+qYqv1h5OsZmZsQ3gj/02h6cO/KEYx29hu3R+VTTwz6D3TymIP1E8RvEiiVdZfEzicxYLiljSxKIqlnW5seitTW6uYnv/Aqh4whX3mEUrAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDE2LTA5LTMwVDE0OjMzOjAyKzAyOjAwl6RMVgAAACV0RVh0ZGF0ZTptb2RpZnkAMjAxNi0wOS0zMFQxNDozMzowMiswMjowMOb59OoAAAAZdEVYdFNvZnR3YXJlAHd3dy5pbmtzY2FwZS5vcmeb7jwaAAAAAElFTkSuQmCC") no-repeat 50% 50%;
    background-size: 8px
}

.iziToast.iziToast-theme-dark .iziToast-icon {
    color: #fff
}

.iziToast.iziToast-theme-dark .iziToast-icon.ico-info {
    background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAMAAACdt4HsAAAAflBMVEUAAAD////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////vroaSAAAAKXRSTlMA6PsIvDob+OapavVhWRYPrIry2MxGQ97czsOzpJaMcE0qJQOwVtKjfxCVFeIAAAI3SURBVFjDlJPZsoIwEETnCiGyb8q+qmjl/3/wFmGKwjBROS9QWbtnOqDDGPq4MdMkSc0m7gcDDhF4NRdv8NoL4EcMpzoJglPl/KTDz4WW3IdvXEvxkfIKn7BMZb1bFK4yZFqghZ03jk0nG8N5NBwzx9xU5cxAg8fXi20/hDdC316lcA8o7t16eRuQvW1XGd2d2P8QSHQDDbdIII/9CR3lUF+lbucfJy4WfMS64EJPORnrZxtfc2pjJdnbuags3l04TTtJMXrdTph4Pyg4XAjugAJqMDf5Rf+oXx2/qi4u6nipakIi7CsgiuMSEF9IGKg8heQJKkxIfFSUU/egWSwNrS1fPDtLfon8sZOcYUQml1Qv9a3kfwsEUyJEMgFBKzdV8o3Iw9yAjg1jdLQCV4qbd3no8yD2GugaC3oMbF0NYHCpJYSDhNI5N2DAWB4F4z9Aj/04Cna/x7eVAQ17vRjQZPh+G/kddYv0h49yY4NWNDWMMOMUIRYvlTECmrN8pUAjo5RCMn8KoPmbJ/+Appgnk//Sy90GYBCGgm7IAskQ7D9hFKW4ApB1ei3FSYD9PjGAKygAV+ARFYBH5BsVgG9kkBSAQWKUFYBRZpkUgGVinRWAdUZQDABBQdIcAElDVBUAUUXWHQBZx1gMAGMprM0AsLbVXHsA5trZe93/wp3svQ0YNb/jWV3AIOLsMtlznSNOH7JqjOpDVh7z8qCZR10ftvO4nxeOvPLkpSuvfXnxzKtvXr7j+v8C5ii0e71At7cAAAAASUVORK5CYII=") no-repeat 50% 50%;
    background-size: 85%
}

.iziToast.iziToast-theme-dark .iziToast-icon.ico-warning {
    background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEQAAABECAMAAAAPzWOAAAAAllBMVEUAAAD////+//3+//3+//3///////z+//3+//3+//3////////////9//3////+//39//3///3////////////+//3+//39//3///z+//z+//7///3///3///3///3////////+//3+//3+//3+//z+//3+//7///3///z////////+//79//3///3///z///v+//3///+trXouAAAAMHRSTlMAB+j87RBf+PXiCwQClSPYhkAzJxnx05tSyadzcmxmHRbp5d7Gwrh4TDkvsYt/WkdQzCITAAAB1UlEQVRYw+3XaXKCQBCGYSIIighoxCVqNJrEPfly/8vFImKXduNsf/Mc4K1y7FnwlMLQc/bUbj85R6bA1LXRDICg6RjJcZa7NQYtnLUGTpERSiOXxrOPkv9s30iGKDmtbYir3H7OUHJa2ylAuvZzRvzUfs7Ii/2cgfTt54x82s8ZSM848gJmYtroQzA2jHwA+LkBIEuMGt+QIng1igzlyMrkuP2CyOi47axRaYTL5jhDJehoR+aovC29s3iIyly3Eb+hRCvZo2qsGTnhKr2cLDS+J73GsqBI9W80UCmWWpEuhIjh6ZRGjyNRarjzKGJ2Ou2himCvjHwqI+rTqQdlRH06TZQR9ek0hiqiPp06mV4ke7QPX6ERUZxO8Uo3sqrfhxvoRrCpvXwL/UjR9GRHMIvLgke4d5QbiwhM6JV2YKKF4vIl7XIBkwm4keryJVmvk/TfwcmPwQNkUQuyA2/sYGwnXL7GPu4bW1jYsmevrNj09/MGZMOEPXslQVqO8hqykD17JfPHP/bmo2yGGpdZiH3IZvzZa7B3+IdDjjpjesHJcvbs5dZ/e+cddVoDdvlq7x12Nac+iN7e4R8OXTjp0pw5CGnOLNDEzeBs5gVwFniAO+8f8wvfeXP2hyqnmwAAAABJRU5ErkJggg==") no-repeat 50% 50%;
    background-size: 85%
}

.iziToast.iziToast-theme-dark .iziToast-icon.ico-error {
    background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAMAAACdt4HsAAAAeFBMVEUAAAD////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////GqOSsAAAAJ3RSTlMA3BsB98QV8uSyWVUFz6RxYwzYvbupmYqAaU1FQTXKv7abj4d1azKNUit3AAACZElEQVRYw7WXaZOCMAyGw30UORRQBLxX/v8/3BkaWjrY2szO5otKfGrzJrEp6Kw6F8f8sI+i/SE/FucKSBaWiT8p5idlaEtnXTB9tKDLLHAvdSatOan3je93k9F2vRF36+mr1a6eH2NFNydoHq/ieU/UXcWjjk9XykdNWq2ywtp4tXL6Wb2T/MqtzzZutsrNyfvA51KoQROhVCjfrnASIRpSVUZiD5v4RbWExjRdJzSmOsZFvzYz59kRSr6V5zE+/QELHkNdb3VRx45HS1b1u+zfkkcbRAZ3qJ9l/A4qefHUDMShJe+6kZKJDD2pLQ9Q4lu+5Q7rz7Plperd7AtQEgIPI6o2dxr2D4GXvxqCiKcn8cD4gxIAEt7/GYkHL16KqeJd0NB4gJbXfgVnzCGJlzGcocCVSLzUvoAj9xJ4NF7/R8gxoVQexc/hgBpSebjPjgPs59cHmYfn7NkDb6wXmUf1I1ygIPPw4gtgCE8yDw8eAop4J/PQcBExjQmZx37MsZB2ZB4cLKQCG5vKYxMWSzMxIg8pNtOyUkvkocEmXGo69mh8FgnxS4yBwMvDrJSNHZB4uC3ayz/YkcIP4lflwVIT+OU07ZSjrbTkZQ6dTPkYubZ8GC/Cqxu6WvJZII93dcCw46GdNqdpTeF/tiMOuDGB9z/NI6NvyWetGPM0g+bVNeovBmamHXWj0nCbEaGeTMN2PWrqd6cM26ZxP2DeJvj+ph/30Zi/GmRbtlK5SptI+nwGGnvH6gUruT+L16MJHF+58rwNIifTV0vM8+hwMeOXAb6Yx0wXT+b999WXfvn+8/X/F7fWzjdTord5AAAAAElFTkSuQmCC") no-repeat 50% 50%;
    background-size: 80%
}

.iziToast.iziToast-theme-dark .iziToast-icon.ico-success {
    background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABABAMAAABYR2ztAAAAIVBMVEUAAAD////////////////////////////////////////PIev5AAAACnRSTlMApAPhIFn82wgGv8mVtwAAAKVJREFUSMft0LEJAkEARNFFFEw1NFJb8CKjAy1AEOzAxNw+bEEEg6nyFjbY4LOzcBwX7S/gwUxoTdIn+Jbv4Lv8bx446+kB6VsBtK0B+wbMCKxrwL33wOrVeeChX28n7KTOTjgoEu6DRSYAgAAAAkAmAIAAAAIACQIkMkACAAgAIACAyECBKAOJuCagTJwSUCaUAEMAABEBRwAAEQFLbCJgO4bW+AZKGnktR+jAFAAAAABJRU5ErkJggg==") no-repeat 50% 50%;
    background-size: 85%
}

.iziToast.iziToast-theme-dark .iziToast-icon.ico-question {
    background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAQAAAAAYLlVAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QAAKqNIzIAAAAJcEhZcwAADdcAAA3XAUIom3gAAAAHdElNRQfhCQkUEg18vki+AAAETUlEQVRo3s1ZTWhbRxD+VlIuxsLFCYVIIQYVopBDoK5bKDWUBupDMNbJ5FBKg/FBziUQdE9yaC+FHBrwsdCfQ9RTGoLxwWl+DqHEojUFFydxnB9bInZDqOsErBrr6yGvs/ueX97bldTKo4Pe7puZb3Z33s7srIIjMY1jyCEjP6ImvyX8pF64arSHznKC06wzijY5xSKz7YbuYokV2lODsyyxqz3gSY6z6gCuqcpxJluFH+Z8U+D/0jyHoxFUBHgfvsGHIS9WMIUlVFFDFTUAGWSRQRY5HMeBEP6b+Ew9dh/7INd2jGeO59kfKdXP85zbIbfGQVf4sYC3N1hm3lo6zzIbPvk6x+zBk7wQGMEMB5xncIAzAS0XrFySSV72iS1yyBVcdA1x0afrsoUJgdFfY2+z8ADAXl7zz0KcwJiPfZKpVuABgClO+nRG+QIHDdfb4qlWwUXvKW4Z7vi6L4J9vg+vbfCeCeZH2RfOdMOc/HbCA4BvIW6EMQz7XK/ltd+hP+VzR9mgva2YSfyGI17fA7ynnocqeQNFfIJ0oHsdv6CC2+rXGBN6cQdveY3fcVRtmy/HDete+93zy8jA8zV7YkwYMrjHzRddRsCdiVCwwmh6wg9iTNC7Y9XIF1iS7kbUpsvvGEdPuTfSgAEjRpR096x0liPFD/Eqt2NMuBQzB2XhrACAApjFsuQFh9XdGAX70B3oSuNdnMVBaX+sopYxjwVpHFBVACyKTXNoktjD+6Ll8xhenS9MAAkAI/Lux2YNUOs4I413Ypg1SgEAu7kpFvWjaeJe0fJHDGe/cNaZBkekudw8PMA+0fMwlndZeAsJ5KR/qhUDUJCnSiyvRsolkJHGUgvjH8QXDgZopEzKMKDqCKrwEQ4C6MH7GEXC665buLJG8hlQc4LP4paxfJrOqYVYYY2UARfEIazTbgDg2dB98GebzJd54b8L/iWNdLyooeR6CHyZ+6xk0yKxkYg6nEVSUG4VJ9QJ9cxRCxO+9WiOyvgUeexXP1hLGH5nGuBWVtiSp4vqe3VP0UFWI9Wan4Er3v8q7jjPWVtm4FtcQQMrOKO2nOQCM5AyDMi56FDrKHA/1nyppS1ppBpYaE8wciEjGI2AaeM41kI4doDX4XiT3Qm1gevyruCgZg9P8xIv8m1nCzTKq6oiJ9xTMiZ505P5m8cdZ0CnZMVXHVljM7WMBzxpyDxygtdxoCEFTaMIWbZU85UvBjgUMYy0fBaAF8V1Lj9qWQ1aMZ5f4k9r+AGMSkMP1vZoZih6k6sicc5h/OFHM9vDqU/VIU7zJZdYYsKGH4g4nAJMGiXZRds1pVMoZ69RM5vfkbh0qkBhsnS2RLMLilQdL9MBHS9UAh0v1e6CYnXHy/WeeCcvLDwl/9OVze69tPKM+M+v7eJN6OzFpWdEF0ucDbhVNFXadnVrmJFlkVNGTS2M6pzmhMvltfPhnN2B63sVuL7fcNP3D1TSk2ihosPrAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDE3LTA5LTA5VDIwOjE4OjEzKzAyOjAweOR7nQAAACV0RVh0ZGF0ZTptb2RpZnkAMjAxNy0wOS0wOVQyMDoxODoxMyswMjowMAm5wyEAAAAZdEVYdFNvZnR3YXJlAHd3dy5pbmtzY2FwZS5vcmeb7jwaAAAAAElFTkSuQmCC") no-repeat 50% 50%;
    background-size: 85%
}

.iziToast.iziToast-theme-dark .iziToast-buttons>a,.iziToast.iziToast-theme-dark .iziToast-buttons>button,.iziToast.iziToast-theme-dark .iziToast-buttons>input {
    color: #fff;
    background: hsla(0,0%,100%,.1)
}

.iziToast.iziToast-theme-dark .iziToast-buttons>a:hover,.iziToast.iziToast-theme-dark .iziToast-buttons>button:hover,.iziToast.iziToast-theme-dark .iziToast-buttons>input:hover {
    background: hsla(0,0%,100%,.2)
}

.iziToast.iziToast-theme-dark .iziToast-buttons>a:focus,.iziToast.iziToast-theme-dark .iziToast-buttons>button:focus,.iziToast.iziToast-theme-dark .iziToast-buttons>input:focus {
    -webkit-box-shadow: 0 0 0 1px hsla(0,0%,100%,.6);
    box-shadow: 0 0 0 1px hsla(0,0%,100%,.6)
}

.iziToast.iziToast-color-red {
    background: rgba(255,175,180,.9);
    border-color: rgba(255,175,180,.9)
}

.iziToast.iziToast-color-orange {
    background: rgba(255,207,165,.9);
    border-color: rgba(255,207,165,.9)
}

.iziToast.iziToast-color-yellow {
    background: rgba(255,249,178,.9);
    border-color: rgba(255,249,178,.9)
}

.iziToast.iziToast-color-blue {
    background: rgba(157,222,255,.9);
    border-color: rgba(157,222,255,.9)
}

.iziToast.iziToast-color-green {
    background: rgba(166,239,184,.9);
    border-color: rgba(166,239,184,.9)
}

.iziToast.iziToast-layout2 .iziToast-body .iziToast-message,.iziToast.iziToast-layout2 .iziToast-body .iziToast-texts {
    width: 100%
}

.iziToast.iziToast-layout3 {
    border-radius: 2px
}

.iziToast.iziToast-layout3:after {
    display: none
}

.iziToast.revealIn,.iziToast .revealIn {
    -webkit-animation: iziT-revealIn 1s cubic-bezier(.25,1.6,.25,1) both;
    animation: iziT-revealIn 1s cubic-bezier(.25,1.6,.25,1) both
}

.iziToast.slideIn,.iziToast .slideIn {
    -webkit-animation: iziT-slideIn 1s cubic-bezier(.16,.81,.32,1) both;
    animation: iziT-slideIn 1s cubic-bezier(.16,.81,.32,1) both
}

.iziToast.bounceInLeft {
    -webkit-animation: iziT-bounceInLeft .7s ease-in-out both;
    animation: iziT-bounceInLeft .7s ease-in-out both
}

.iziToast.bounceInRight {
    -webkit-animation: iziT-bounceInRight .85s ease-in-out both;
    animation: iziT-bounceInRight .85s ease-in-out both
}

.iziToast.bounceInDown {
    -webkit-animation: iziT-bounceInDown .7s ease-in-out both;
    animation: iziT-bounceInDown .7s ease-in-out both
}

.iziToast.bounceInUp {
    -webkit-animation: iziT-bounceInUp .7s ease-in-out both;
    animation: iziT-bounceInUp .7s ease-in-out both
}

.iziToast.fadeIn,.iziToast .fadeIn {
    -webkit-animation: iziT-fadeIn .5s ease both;
    animation: iziT-fadeIn .5s ease both
}

.iziToast.fadeInUp {
    -webkit-animation: iziT-fadeInUp .7s ease both;
    animation: iziT-fadeInUp .7s ease both
}

.iziToast.fadeInDown {
    -webkit-animation: iziT-fadeInDown .7s ease both;
    animation: iziT-fadeInDown .7s ease both
}

.iziToast.fadeInLeft {
    -webkit-animation: iziT-fadeInLeft .85s cubic-bezier(.25,.8,.25,1) both;
    animation: iziT-fadeInLeft .85s cubic-bezier(.25,.8,.25,1) both
}

.iziToast.fadeInRight {
    -webkit-animation: iziT-fadeInRight .85s cubic-bezier(.25,.8,.25,1) both;
    animation: iziT-fadeInRight .85s cubic-bezier(.25,.8,.25,1) both
}

.iziToast.flipInX {
    -webkit-animation: iziT-flipInX .85s cubic-bezier(.35,0,.25,1) both;
    animation: iziT-flipInX .85s cubic-bezier(.35,0,.25,1) both
}

.iziToast.fadeOut {
    -webkit-animation: iziT-fadeOut .7s ease both;
    animation: iziT-fadeOut .7s ease both
}

.iziToast.fadeOutDown {
    -webkit-animation: iziT-fadeOutDown .7s cubic-bezier(.4,.45,.15,.91) both;
    animation: iziT-fadeOutDown .7s cubic-bezier(.4,.45,.15,.91) both
}

.iziToast.fadeOutUp {
    -webkit-animation: iziT-fadeOutUp .7s cubic-bezier(.4,.45,.15,.91) both;
    animation: iziT-fadeOutUp .7s cubic-bezier(.4,.45,.15,.91) both
}

.iziToast.fadeOutLeft {
    -webkit-animation: iziT-fadeOutLeft .5s ease both;
    animation: iziT-fadeOutLeft .5s ease both
}

.iziToast.fadeOutRight {
    -webkit-animation: iziT-fadeOutRight .5s ease both;
    animation: iziT-fadeOutRight .5s ease both
}

.iziToast.flipOutX {
    -webkit-backface-visibility: visible!important;
    backface-visibility: visible!important;
    -webkit-animation: iziT-flipOutX .7s cubic-bezier(.4,.45,.15,.91) both;
    animation: iziT-flipOutX .7s cubic-bezier(.4,.45,.15,.91) both
}

.iziToast-overlay.fadeIn {
    -webkit-animation: iziT-fadeIn .5s ease both;
    animation: iziT-fadeIn .5s ease both
}

.iziToast-overlay.fadeOut {
    -webkit-animation: iziT-fadeOut .7s ease both;
    animation: iziT-fadeOut .7s ease both
}

@-webkit-keyframes iziT-revealIn {
    0% {
        opacity: 0;
        -webkit-transform: scale3d(.3,.3,1);
        transform: scale3d(.3,.3,1)
    }

    to {
        opacity: 1
    }
}

@keyframes iziT-revealIn {
    0% {
        opacity: 0;
        -webkit-transform: scale3d(.3,.3,1);
        transform: scale3d(.3,.3,1)
    }

    to {
        opacity: 1
    }
}

@-webkit-keyframes iziT-slideIn {
    0% {
        opacity: 0;
        -webkit-transform: translateX(50px);
        transform: translateX(50px)
    }

    to {
        opacity: 1;
        -webkit-transform: translateX(0);
        transform: translateX(0)
    }
}

@keyframes iziT-slideIn {
    0% {
        opacity: 0;
        -webkit-transform: translateX(50px);
        transform: translateX(50px)
    }

    to {
        opacity: 1;
        -webkit-transform: translateX(0);
        transform: translateX(0)
    }
}

@-webkit-keyframes iziT-bounceInLeft {
    0% {
        opacity: 0;
        -webkit-transform: translateX(280px);
        transform: translateX(280px)
    }

    50% {
        opacity: 1;
        -webkit-transform: translateX(-20px);
        transform: translateX(-20px)
    }

    70% {
        -webkit-transform: translateX(10px);
        transform: translateX(10px)
    }

    to {
        -webkit-transform: translateX(0);
        transform: translateX(0)
    }
}

@keyframes iziT-bounceInLeft {
    0% {
        opacity: 0;
        -webkit-transform: translateX(280px);
        transform: translateX(280px)
    }

    50% {
        opacity: 1;
        -webkit-transform: translateX(-20px);
        transform: translateX(-20px)
    }

    70% {
        -webkit-transform: translateX(10px);
        transform: translateX(10px)
    }

    to {
        -webkit-transform: translateX(0);
        transform: translateX(0)
    }
}

@-webkit-keyframes iziT-bounceInRight {
    0% {
        opacity: 0;
        -webkit-transform: translateX(-280px);
        transform: translateX(-280px)
    }

    50% {
        opacity: 1;
        -webkit-transform: translateX(20px);
        transform: translateX(20px)
    }

    70% {
        -webkit-transform: translateX(-10px);
        transform: translateX(-10px)
    }

    to {
        -webkit-transform: translateX(0);
        transform: translateX(0)
    }
}

@keyframes iziT-bounceInRight {
    0% {
        opacity: 0;
        -webkit-transform: translateX(-280px);
        transform: translateX(-280px)
    }

    50% {
        opacity: 1;
        -webkit-transform: translateX(20px);
        transform: translateX(20px)
    }

    70% {
        -webkit-transform: translateX(-10px);
        transform: translateX(-10px)
    }

    to {
        -webkit-transform: translateX(0);
        transform: translateX(0)
    }
}

@-webkit-keyframes iziT-bounceInDown {
    0% {
        opacity: 0;
        -webkit-transform: translateY(-200px);
        transform: translateY(-200px)
    }

    50% {
        opacity: 1;
        -webkit-transform: translateY(10px);
        transform: translateY(10px)
    }

    70% {
        -webkit-transform: translateY(-5px);
        transform: translateY(-5px)
    }

    to {
        -webkit-transform: translateY(0);
        transform: translateY(0)
    }
}

@keyframes iziT-bounceInDown {
    0% {
        opacity: 0;
        -webkit-transform: translateY(-200px);
        transform: translateY(-200px)
    }

    50% {
        opacity: 1;
        -webkit-transform: translateY(10px);
        transform: translateY(10px)
    }

    70% {
        -webkit-transform: translateY(-5px);
        transform: translateY(-5px)
    }

    to {
        -webkit-transform: translateY(0);
        transform: translateY(0)
    }
}

@-webkit-keyframes iziT-bounceInUp {
    0% {
        opacity: 0;
        -webkit-transform: translateY(200px);
        transform: translateY(200px)
    }

    50% {
        opacity: 1;
        -webkit-transform: translateY(-10px);
        transform: translateY(-10px)
    }

    70% {
        -webkit-transform: translateY(5px);
        transform: translateY(5px)
    }

    to {
        -webkit-transform: translateY(0);
        transform: translateY(0)
    }
}

@keyframes iziT-bounceInUp {
    0% {
        opacity: 0;
        -webkit-transform: translateY(200px);
        transform: translateY(200px)
    }

    50% {
        opacity: 1;
        -webkit-transform: translateY(-10px);
        transform: translateY(-10px)
    }

    70% {
        -webkit-transform: translateY(5px);
        transform: translateY(5px)
    }

    to {
        -webkit-transform: translateY(0);
        transform: translateY(0)
    }
}

@-webkit-keyframes iziT-fadeIn {
    0% {
        opacity: 0
    }

    to {
        opacity: 1
    }
}

@keyframes iziT-fadeIn {
    0% {
        opacity: 0
    }

    to {
        opacity: 1
    }
}

@-webkit-keyframes iziT-fadeInUp {
    0% {
        opacity: 0;
        -webkit-transform: translate3d(0,100%,0);
        transform: translate3d(0,100%,0)
    }

    to {
        opacity: 1;
        -webkit-transform: none;
        transform: none
    }
}

@keyframes iziT-fadeInUp {
    0% {
        opacity: 0;
        -webkit-transform: translate3d(0,100%,0);
        transform: translate3d(0,100%,0)
    }

    to {
        opacity: 1;
        -webkit-transform: none;
        transform: none
    }
}

@-webkit-keyframes iziT-fadeInDown {
    0% {
        opacity: 0;
        -webkit-transform: translate3d(0,-100%,0);
        transform: translate3d(0,-100%,0)
    }

    to {
        opacity: 1;
        -webkit-transform: none;
        transform: none
    }
}

@keyframes iziT-fadeInDown {
    0% {
        opacity: 0;
        -webkit-transform: translate3d(0,-100%,0);
        transform: translate3d(0,-100%,0)
    }

    to {
        opacity: 1;
        -webkit-transform: none;
        transform: none
    }
}

@-webkit-keyframes iziT-fadeInLeft {
    0% {
        opacity: 0;
        -webkit-transform: translate3d(300px,0,0);
        transform: translate3d(300px,0,0)
    }

    to {
        opacity: 1;
        -webkit-transform: none;
        transform: none
    }
}

@keyframes iziT-fadeInLeft {
    0% {
        opacity: 0;
        -webkit-transform: translate3d(300px,0,0);
        transform: translate3d(300px,0,0)
    }

    to {
        opacity: 1;
        -webkit-transform: none;
        transform: none
    }
}

@-webkit-keyframes iziT-fadeInRight {
    0% {
        opacity: 0;
        -webkit-transform: translate3d(-300px,0,0);
        transform: translate3d(-300px,0,0)
    }

    to {
        opacity: 1;
        -webkit-transform: none;
        transform: none
    }
}

@keyframes iziT-fadeInRight {
    0% {
        opacity: 0;
        -webkit-transform: translate3d(-300px,0,0);
        transform: translate3d(-300px,0,0)
    }

    to {
        opacity: 1;
        -webkit-transform: none;
        transform: none
    }
}

@-webkit-keyframes iziT-flipInX {
    0% {
        -webkit-transform: perspective(400px) rotateX(90deg);
        transform: perspective(400px) rotateX(90deg);
        opacity: 0
    }

    40% {
        -webkit-transform: perspective(400px) rotateX(-20deg);
        transform: perspective(400px) rotateX(-20deg)
    }

    60% {
        -webkit-transform: perspective(400px) rotateX(10deg);
        transform: perspective(400px) rotateX(10deg);
        opacity: 1
    }

    80% {
        -webkit-transform: perspective(400px) rotateX(-5deg);
        transform: perspective(400px) rotateX(-5deg)
    }

    to {
        -webkit-transform: perspective(400px);
        transform: perspective(400px)
    }
}

@keyframes iziT-flipInX {
    0% {
        -webkit-transform: perspective(400px) rotateX(90deg);
        transform: perspective(400px) rotateX(90deg);
        opacity: 0
    }

    40% {
        -webkit-transform: perspective(400px) rotateX(-20deg);
        transform: perspective(400px) rotateX(-20deg)
    }

    60% {
        -webkit-transform: perspective(400px) rotateX(10deg);
        transform: perspective(400px) rotateX(10deg);
        opacity: 1
    }

    80% {
        -webkit-transform: perspective(400px) rotateX(-5deg);
        transform: perspective(400px) rotateX(-5deg)
    }

    to {
        -webkit-transform: perspective(400px);
        transform: perspective(400px)
    }
}

@-webkit-keyframes iziT-fadeOut {
    0% {
        opacity: 1
    }

    to {
        opacity: 0
    }
}

@keyframes iziT-fadeOut {
    0% {
        opacity: 1
    }

    to {
        opacity: 0
    }
}

@-webkit-keyframes iziT-fadeOutDown {
    0% {
        opacity: 1
    }

    to {
        opacity: 0;
        -webkit-transform: translate3d(0,100%,0);
        transform: translate3d(0,100%,0)
    }
}

@keyframes iziT-fadeOutDown {
    0% {
        opacity: 1
    }

    to {
        opacity: 0;
        -webkit-transform: translate3d(0,100%,0);
        transform: translate3d(0,100%,0)
    }
}

@-webkit-keyframes iziT-fadeOutUp {
    0% {
        opacity: 1
    }

    to {
        opacity: 0;
        -webkit-transform: translate3d(0,-100%,0);
        transform: translate3d(0,-100%,0)
    }
}

@keyframes iziT-fadeOutUp {
    0% {
        opacity: 1
    }

    to {
        opacity: 0;
        -webkit-transform: translate3d(0,-100%,0);
        transform: translate3d(0,-100%,0)
    }
}

@-webkit-keyframes iziT-fadeOutLeft {
    0% {
        opacity: 1
    }

    to {
        opacity: 0;
        -webkit-transform: translate3d(-200px,0,0);
        transform: translate3d(-200px,0,0)
    }
}

@keyframes iziT-fadeOutLeft {
    0% {
        opacity: 1
    }

    to {
        opacity: 0;
        -webkit-transform: translate3d(-200px,0,0);
        transform: translate3d(-200px,0,0)
    }
}

@-webkit-keyframes iziT-fadeOutRight {
    0% {
        opacity: 1
    }

    to {
        opacity: 0;
        -webkit-transform: translate3d(200px,0,0);
        transform: translate3d(200px,0,0)
    }
}

@keyframes iziT-fadeOutRight {
    0% {
        opacity: 1
    }

    to {
        opacity: 0;
        -webkit-transform: translate3d(200px,0,0);
        transform: translate3d(200px,0,0)
    }
}

@-webkit-keyframes iziT-flipOutX {
    0% {
        -webkit-transform: perspective(400px);
        transform: perspective(400px)
    }

    30% {
        -webkit-transform: perspective(400px) rotateX(-20deg);
        transform: perspective(400px) rotateX(-20deg);
        opacity: 1
    }

    to {
        -webkit-transform: perspective(400px) rotateX(90deg);
        transform: perspective(400px) rotateX(90deg);
        opacity: 0
    }
}

@keyframes iziT-flipOutX {
    0% {
        -webkit-transform: perspective(400px);
        transform: perspective(400px)
    }

    30% {
        -webkit-transform: perspective(400px) rotateX(-20deg);
        transform: perspective(400px) rotateX(-20deg);
        opacity: 1
    }

    to {
        -webkit-transform: perspective(400px) rotateX(90deg);
        transform: perspective(400px) rotateX(90deg);
        opacity: 0
    }
}

body {
    font-family: Jura,sans-serif;
    color: #fff;
    font-weight: 300;
    -webkit-transition: left .3s;
    transition: left .3s;
    position: relative;
    left: 0
}

a {
    -webkit-transition: all .3s;
    transition: all .3s
}

a:active,a:focus,a:hover {
    text-decoration: none
}

img {
    max-width: 100%
}

.slick-initialized .slick-slide {
    height: auto
}

#header .banner {
    position: relative
}

#header .banner .top {
    position: fixed;
    border-bottom: 1px solid transparent;
    z-index: 40;
    width: 100%;
    border-top: 3px solid #f60;
    -webkit-transition: all .3s;
    transition: all .3s
}

#header .banner .inner-top {
    display: -ms-flexbox;
    display: flex;
    display: -webkit-box;
    display: -webkit-flex;
    -ms-justify-content: space-between;
    justify-content: space-between;
    -ms-flex-pack: justify;
    -webkit-box-pack: justify;
    -webkit-justify-content: space-between;
    -ms-align-items: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-align-items: center;
    -webkit-box-align: center;
    padding: 10px 15px;
    -webkit-transition: all .3s;
    transition: all .3s
}

#header .banner .top.is-sticky {
    background: #1f2022;
    border-bottom-color: #2c2c2e
}

#header .banner .top.is-sticky .inner-top {
    padding-top: 10px;
    padding-bottom: 10px
}

#header .banner .top.is-sticky .logo img {
    height: 40px;
    -webkit-transition: height .3s;
    transition: height .3s
}

#header .banner .top .menu-mobile .menu-icon {
    padding: 8px 0
}

#header .banner .top .menu-mobile .menu-icon img {
    height: 12px;
    display: block
}

#header .banner .top .logo img {
    height: 40px
}

#header .banner .top .breadcrumbs,#header .banner .top .contact-desktop {
    display: none
}

#header .banner .top .contact a {
    display: block
}

#header .banner .top .contact img {
    height: 16px;
    display: block
}

#header .banner .slide {
    position: absolute;
    z-index: 20;
    width: 100%;
    top: 50%;
    left: 0;
    -webkit-transform: translateY(-50%);
    transform: translateY(-50%);
    margin-top: 26px;
    text-align: center
}

#header .banner .slide h1 {
    font-size: 18px;
    margin: 0 15px;
    position: relative;
    font-weight: 500;
    padding-bottom: 10px
}

#header .banner .slide h1:after,#header .banner .slide h1:before {
    content: "";
    position: absolute;
    left: 50%;
    -webkit-transform: translateX(-50%);
    transform: translateX(-50%)
}

#header .banner .slide h1:before {
    bottom: -1px;
    z-index: 1;
    width: 35px;
    height: 2px;
    background: #f60
}

#header .banner .slide h1:after {
    bottom: 0;
    z-index: 0;
    max-width: 330px;
    width: 100%;
    height: 1px;
    background: hsla(0,0%,100%,.1)
}

#header .banner .slide h1 span {
    display: block;
    letter-spacing: 3px;
    margin-bottom: 5px
}

#header .banner .slide h1 strong {
    font-weight: inherit;
    display: block;
    color: #f60
}

#header .banner .mouse,#header .banner .social {
    display: none
}

#header .banner .youtube-bg .youtube-relative {
    width: 100%
}

#header .banner .youtube-bg .youtube-inner {
    position: fixed;
    overflow: hidden;
    top: 0;
    left: 0;
    z-index: -1;
    width: 100%
}

#header .banner .youtube-overlay {
    width: 100%;
    opacity: 0
}

#header .banner #page-youtube {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%
}

#header .banner #page-youtube iframe {
    vertical-align: middle;
    width: 100%!important;
    left: 0!important;
    height: 100%!important
}

#header .banner #page-youtube .youtube-first {
    width: 100%
}

#header .banner #page-youtube .ytplayer-container {
    height: 100%
}

#header .menu-outer {
    background: #1c1d1f;
    padding: 10px 15px;
    display: -ms-flexbox;
    display: flex;
    display: -webkit-box;
    display: -webkit-flex;
    -ms-justify-content: space-between;
    justify-content: space-between;
    -ms-flex-pack: justify;
    -webkit-box-pack: justify;
    -webkit-justify-content: space-between
}

#header .menu {
    width: calc(100% - 103px)
}

#header .menu:not(.slick-initialized) .menu-item {
    display: none
}

#header .menu .menu-item:first-child {
    display: block
}

#header .menu .menu-item a {
    display: -ms-flexbox;
    display: flex;
    display: -webkit-box;
    display: -webkit-flex;
    -ms-align-items: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-align-items: center;
    -webkit-box-align: center;
    outline: none
}

#header .menu .menu-item .img .normal {
    display: none
}

#header .menu .menu-item img {
    height: 50px
}

#header .menu .menu-item span {
    font-size: 14px;
    color: #fff;
    margin-left: 15px;
    font-weight: 600;
    width: calc(100% - 68px);
    text-overflow: ellipsis;
    overflow: hidden;
    line-height: 1.2
}

#header .arrow-menu {
    display: -ms-flexbox;
    display: flex;
    display: -webkit-box;
    display: -webkit-flex;
    -ms-align-items: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-align-items: center;
    -webkit-box-align: center
}

#header .arrow-menu div {
    border: 2px solid hsla(0,0%,100%,.05);
    width: 49px;
    height: 40px;
    background-repeat: no-repeat;
    background-position: 50%;
    background-size: 8px auto;
    cursor: pointer
}

#header .arrow-menu .next {
    border-left-width: 1px;
    background-image: url(/images/mobile_ico_next_hover.png?aeb4bcad2f54ee055769aa4d7a64b3e1)
}

#header .arrow-menu .prev {
    border-right-width: 1px;
    background-image: url(/images/mobile_ico_pre_hover.png?8df995ed6fa013d763f17883682da729)
}

#header .arrow-menu .prev.slick-disabled {
    background-image: url(/images/mobile_ico_pre.png?b6d5016c4955b7d31f37f612de6072a7)
}

#header .arrow-menu .next.slick-disabled {
    background-image: url(/images/mobile_ico_next.png?6f4eb9472b5ce47617b4767f15c90be6)
}

#header .arrow-menu .slick-disabled {
    pointer-events: none
}

#header .slidebar {
    background: #161719;
    position: fixed;
    top: 0;
    left: -240px;
    height: 100%;
    max-width: 240px;
    width: 100%;
    overflow-y: auto;
    -webkit-transition: left .3s;
    transition: left .3s
}

#header .slidebar .social {
    display: -ms-flexbox;
    display: flex;
    display: -webkit-box;
    display: -webkit-flex;
    -ms-justify-content: center;
    -ms-flex-pack: distribute;
    justify-content: center;
    -webkit-box-pack: center;
    -webkit-justify-content: center;
    margin: 15px 0
}

#header .slidebar .social a {
    width: 60px;
    border: 2px solid hsla(0,0%,100%,.2);
    margin: 0 6px;
    text-align: center
}

#header .slidebar .social a:hover {
    border-color: #f60
}

#header .slidebar .social img {
    width: 26px;
    margin: 5px 0
}

#header .slidebar .title {
    text-align: center;
    font-size: 16px;
    color: #f60;
    font-weight: 500;
    background: hsla(0,0%,100%,.03);
    padding: 9px 0;
    letter-spacing: 1px
}

#header .menu-slidebar {
    display: -ms-flexbox;
    display: flex;
    display: -webkit-box;
    display: -webkit-flex;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
    -webkit-flex-wrap: wrap
}

#header .menu-slidebar .menu-item {
    width: 50%;
    text-align: center;
    padding: 23px 0
}

#header .menu-slidebar .menu-item:nth-child(2n+3) {
    position: relative
}

#header .menu-slidebar .menu-item:nth-child(2n+3):after,#header .menu-slidebar .menu-item:nth-child(2n+3):before {
    content: "";
    background: hsla(0,0%,100%,.1);
    position: absolute
}

#header .menu-slidebar .menu-item:nth-child(2n+3):before {
    width: 37px;
    height: 1px;
    top: 0;
    right: 0;
    margin-right: -18px
}

#header .menu-slidebar .menu-item:nth-child(2n+3):after {
    width: 1px;
    height: 37px;
    top: 0;
    right: 0;
    margin-top: -18px
}

#header .menu-slidebar a {
    color: hsla(0,0%,100%,.1);
    display: block
}

#header .menu-slidebar .img {
    margin-bottom: 15px
}

#header .menu-slidebar .img img {
    width: 65px
}

#header .menu-slidebar .img .hover {
    display: none
}

#header .menu-slidebar span {
    font-size: 14px;
    font-weight: 500
}

#header .menu-slidebar .menu-item.active a,#header .menu-slidebar .menu-item a:hover {
    color: #fff
}

#header .menu-slidebar .menu-item.active .normal,#header .menu-slidebar .menu-item:hover .normal {
    display: none
}

#header .menu-slidebar .menu-item.active .hover,#header .menu-slidebar .menu-item:hover .hover {
    display: inline
}

#header.header-porfolio .banner {
    height: 64px;
    background: #1f2022
}

#header.header-porfolio .banner .top {
    border-bottom-color: #2c2c2e
}

#header.header-porfolio .menu-outer {
    display: none
}

body.active-slidebar {
    left: 240px
}

body.active-slidebar #header .slidebar {
    left: 0
}

#list-video {
    background: #1f2022
}

#list-video .item {
    position: relative;
    width: 100%
}

#list-video .item .link {
    position: absolute;
    z-index: 20;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    outline: none
}

#list-video .item:after,#list-video .item:before {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%
}

#list-video .item:after {
    height: 100%;
    background: url(/images/visual-vj-shadows.png?3c09e1f90b8e24ad61c96ef3e4dc11d6) bottom no-repeat;
    background-size: 100% auto;
    z-index: 0
}

#list-video .item:before {
    height: 8px;
    background: hsla(0,0%,100%,.1);
    z-index: 2;
    -webkit-transition: all .3s;
    transition: all .3s
}

#list-video .item .img {
    width: 100%
}

#list-video .item .info {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    z-index: 10;
    padding: 0 20px 20px
}

#list-video .item .info .cate {
    font-size: 14px;
    color: #f60;
    font-weight: 500
}

#list-video .item .info h3 {
    margin: 0 0 5px;
    text-transform: uppercase;
    font-size: 24px;
    font-weight: 400
}

#list-video .item .time {
    display: -ms-flexbox;
    display: flex;
    display: -webkit-box;
    display: -webkit-flex;
    -ms-align-items: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-align-items: center;
    -webkit-box-align: center;
    font-size: 14px
}

#list-video .item .time img {
    margin-right: 10px
}

#list-video .item .des {
    display: none
}

#load-more-video {
    background: #1c1d1f;
    border: 1px solid #2d2d2f;
    text-align: center;
    padding: 20px 15px
}

#load-more-video span {
    display: inline-block;
    border: 2px solid #fe6501;
    line-height: 46px;
    color: #fff;
    font-size: 16px;
    font-weight: 400;
    letter-spacing: 1px;
    max-width: 250px;
    width: 100%;
    cursor: pointer;
    -webkit-transition: all .3s;
    transition: all .3s
}

#load-more-video span:hover {
    background: #fe6501;
    color: #fff
}

#about-contact {
    background: #1f2022;
    text-align: center;
    border-bottom: 1px solid #2d2d2f
}

#about-contact .ac-inner {
    padding: 0 15px 50px
}

#about-contact .title {
    font-weight: 400;
    font-size: 24px;
    color: #fe6501;
    padding: 50px 0 20px;
    letter-spacing: 1px
}

#about-contact .about .img {
    margin-bottom: 20px
}

#about-contact .about .info {
    font-size: 18px;
    line-height: 1.3;
    margin-bottom: 35px
}

#about-contact .about .info .des-1 {
    margin-bottom: 15px
}

#about-contact .about .info .des-2 {
    color: #acaeb1
}

#about-contact .about .social {
    display: -ms-flexbox;
    display: flex;
    display: -webkit-box;
    display: -webkit-flex;
    -ms-justify-content: center;
    -ms-flex-pack: distribute;
    justify-content: center;
    -webkit-box-pack: center;
    -webkit-justify-content: center;
    margin-bottom: 30px
}

#about-contact .about .social a {
    width: 75px;
    padding: 4px 0;
    border: 2px solid hsla(0,0%,100%,.1);
    margin: 0 6px
}

#about-contact .about .social img {
    opacity: .5;
    -webkit-transition: all .3s;
    transition: all .3s;
    height: 38px
}

#about-contact .about .social a:hover {
    border-color: hsla(0,0%,100%,.5)
}

#about-contact .about .social a:hover img {
    opacity: 1
}

#about-contact .about .see-more a {
    display: -webkit-inline-box;
    display: -ms-inline-flexbox;
    display: inline-flex;
    -ms-align-items: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-align-items: center;
    -webkit-box-align: center;
    border: 2px solid #fe6501;
    height: 50px;
    -ms-justify-content: center;
    -ms-flex-pack: distribute;
    justify-content: center;
    -webkit-box-pack: center;
    -webkit-justify-content: center;
    color: #fff;
    font-size: 16px;
    font-weight: 400;
    letter-spacing: 1px;
    background: url(/images/ico_arrow_btn.png?97d85172fe91a3553275bfa176473f56) right 29px center no-repeat;
    padding: 0 75px 0 30px
}

#about-contact .about .see-more a:hover {
    background-image: url(/images/ico_arrow_btn_hover.png?8b22b33f7f15136745b51b81e3222268);
    background-color: #fe6501
}

#about-contact .contact form {
    padding-top: 15px
}

#about-contact .contact form .txt {
    padding: 0 0 15px;
    margin: 55px 0 0;
    border: none;
    outline: none;
    background: transparent;
    width: 100%;
    text-align: center;
    font-size: 20px;
    border-bottom: 1px solid hsla(0,0%,100%,.1)
}

#about-contact .contact form .txt:-moz-placeholder,#about-contact .contact form .txt:-ms-input-placeholder,#about-contact .contact form .txt::-moz-placeholder,#about-contact .contact form .txt::-webkit-input-placeholder {
    color: #fff
}

#about-contact .contact form .txt:first-child {
    margin-top: 0
}

#about-contact .contact form .button {
    border: 2px solid #fff;
    background: transparent;
    width: 100%;
    font-size: 22px;
    height: 65px;
    margin: 0;
    padding: 0;
    font-weight: 400;
    -webkit-transition: all .3s;
    transition: all .3s;
    outline: none;
    margin-bottom: 15px;
    letter-spacing: 1px
}

#about-contact .contact form .button:hover {
    color: #fe6501;
    border-color: #fe6501
}

#about-contact .contact form .text-error {
    color: #f60;
    text-align: center;
    margin: 5px 0 0;
    direction: ltr
}

#about-contact .contact .btn-phone {
    margin-top: 20px
}

#about-contact .contact .phone {
    display: -ms-flexbox;
    display: flex;
    display: -webkit-box;
    display: -webkit-flex;
    -ms-justify-content: center;
    -ms-flex-pack: distribute;
    justify-content: center;
    -webkit-box-pack: center;
    -webkit-justify-content: center;
    -ms-align-items: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-align-items: center;
    -webkit-box-align: center;
    font-size: 22px;
    height: 65px;
    background: #fe6501;
    color: #fff;
    font-weight: 400;
    letter-spacing: 1px
}

#about-contact .contact .phone img {
    margin-right: 20px
}

#partner {
    background: #1c1d1f;
    height: 0;
    overflow: hidden
}

#partner .inner {
    display: -ms-flexbox;
    display: flex;
    display: -webkit-box;
    display: -webkit-flex;
    height: 175px;
    -ms-align-items: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-align-items: center;
    -webkit-box-align: center
}

#partner .inner .slick-list {
    width: 100%
}

#partner .inner .item {
    width: 25%;
    opacity: .5;
    -webkit-transition: all .3s;
    transition: all .3s;
    outline: none;
    text-align: center
}

#partner .inner a {
    outline: none
}

#partner .inner .item:hover {
    opacity: 1
}

#partner img {
    width: 155px;
    display: inline
}

#partner .slick-track {
    display: -ms-flexbox;
    display: flex;
    display: -webkit-box;
    display: -webkit-flex;
    -ms-align-items: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-align-items: center;
    -webkit-box-align: center
}

#address {
    border-bottom: 1px solid #2d2d2f
}

#address .item {
    background-repeat: no-repeat;
    background-position: 50%;
    background-size: cover;
    padding: 75px 15px;
    font-weight: 400
}

#address .address-1 {
    background-image: url(/images/footer_bg_company.png?5a945d122ce50f34b517441cfcedb06a);
    border-bottom: 1px solid #2d2d2f
}

#address .address-2 {
    background-image: url(/images/footer_bg_studios.png?8aecda749487ef9058f96103cd6b7799);
    background-position: 0
}

#address .title {
    font-size: 24px;
    letter-spacing: 2px;
    margin-bottom: 35px
}

#address address {
    font-size: 18px;
    color: hsla(0,0%,100%,.5);
    margin: 0 0 20px
}

#address .phone {
    font-size: 18px
}

#address .phone th {
    padding: 10px 20px 10px 0;
    color: hsla(0,0%,100%,.5)
}

#address .phone a {
    color: #f60
}

#address .phone a:hover {
    color: #fff
}

#footer {
    background: #121214
}

#footer .inner {
    padding: 23px 15px;
    display: -ms-flexbox;
    display: flex;
    display: -webkit-box;
    display: -webkit-flex;
    -ms-justify-content: space-between;
    justify-content: space-between;
    -ms-flex-pack: justify;
    -webkit-box-pack: justify;
    -webkit-justify-content: space-between;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
    -webkit-flex-wrap: wrap;
    -ms-align-items: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-align-items: center;
    -webkit-box-align: center
}

#footer .logo img {
    width: 103px
}

#footer .copyright {
    font-size: 14px;
    color: hsla(0,0%,100%,.2);
    -webkit-box-ordinal-group: 4;
    -ms-flex-order: 3;
    order: 3;
    width: 100%;
    margin-top: 20px;
    text-align: center
}

#footer .social {
    display: -ms-flexbox;
    display: flex;
    display: -webkit-box;
    display: -webkit-flex;
    -ms-align-items: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-align-items: center;
    -webkit-box-align: center
}

#footer .social a {
    margin-right: 10px
}

#footer .social a:last-child {
    margin-right: 0
}

@media screen and (min-width: 360px) {
    #header .banner .slide h1 {
        font-size:20px
    }

    #header .banner .slide h1 strong {
        letter-spacing: 1px
    }
}

@media screen and (min-width: 768px) {
    #header .banner .inner-top {
        padding:30px 27px
    }

    #header .banner .top .logo img {
        height: 44px
    }

    #header .banner .slide {
        margin-top: 0
    }

    #header .banner .slide h1 {
        padding-bottom: 20px
    }

    #header .banner .slide h1 strong {
        font-size: 35px
    }

    #header .banner .mouse {
        display: block;
        position: absolute;
        bottom: 9%;
        left: 50%;
        -webkit-transform: translateX(-50%);
        transform: translateX(-50%)
    }

    #header .banner .mouse img {
        height: 30px;
        cursor: pointer
    }

    #header .arrow-menu {
        display: none
    }

    #header .menu-outer {
        padding: 0;
        border-top: 1px solid #2d2d2f;
        border-bottom: 1px solid #2d2d2f
    }

    #header .menu {
        display: -ms-flexbox;
        display: flex;
        display: -webkit-box;
        display: -webkit-flex;
        width: 100%;
        max-width: 1200px;
        margin: 0 auto
    }

    #header .menu:not(.slick-initialized) .menu-item {
        display: block
    }

    #header .menu .menu-item {
        width: 16.66%
    }

    #header .menu .menu-item a {
        display: block;
        text-align: center;
        padding: 15px 0;
        border-top: 3px solid transparent
    }

    #header .menu .menu-item .img .normal {
        display: inline
    }

    #header .menu .menu-item .img .hover {
        display: none
    }

    #header .menu .menu-item span {
        margin: 15px 0 0;
        display: block;
        width: 100%;
        color: hsla(0,0%,100%,.1);
        -webkit-transition: all .3s;
        transition: all .3s
    }

    #header .menu .menu-item.active .hover,#header .menu .menu-item a:hover .hover {
        display: inline
    }

    #header .menu .menu-item.active .normal,#header .menu .menu-item a:hover .normal {
        display: none
    }

    #header .menu .menu-item.active span,#header .menu .menu-item a:hover span {
        color: #fff
    }

    #header .menu .menu-item.active a,#header .menu .menu-item a:hover {
        border-top-color: #f60
    }

    #header.header-porfolio .banner {
        height: 102px
    }

    #header.header-porfolio .menu-outer {
        display: -ms-flexbox;
        display: flex;
        display: -webkit-box;
        display: -webkit-flex;
        border-top: none
    }

    #header.header-porfolio .banner .inner-top {
        padding-top: 10px;
        padding-bottom: 10px
    }

    #list-video {
        display: -ms-flexbox;
        display: flex;
        display: -webkit-box;
        display: -webkit-flex;
        -ms-flex-wrap: wrap;
        flex-wrap: wrap;
        -webkit-flex-wrap: wrap
    }

    #list-video .item {
        width: 50%
    }

    #list-video.lv-homepage .item:nth-child(n+5) {
        display: none
    }

    #list-video .item .info {
        padding-bottom: 35px
    }

    #load-more-video {
        padding-top: 30px;
        padding-bottom: 30px
    }

    #about-contact {
        text-align: left
    }

    #about-contact .ac-inner {
        display: -ms-flexbox;
        display: flex;
        display: -webkit-box;
        display: -webkit-flex;
        padding: 0 30px 65px
    }

    #about-contact .ac-tab {
        width: 50%
    }

    #about-contact .contact {
        direction: rtl;
        text-align: right
    }

    #about-contact .ac-content {
        display: none
    }

    #about-contact .ac-tab.active .ac-content {
        display: block;
        width: 200%
    }

    #about-contact .ac-tab.active .ac-content form {
        max-width: 680px;
        margin: 0 auto
    }

    #about-contact .title {
        color: hsla(0,0%,100%,.2);
        border-bottom: 3px solid transparent;
        margin-bottom: 45px;
        -webkit-transition: all .3s;
        transition: all .3s;
        cursor: pointer;
        padding-top: 65px;
        display: inline-block
    }

    #about-contact .ac-tab.active .title,#about-contact .title:hover {
        border-color: #fe6501;
        color: #fff
    }

    #about-contact .about .info {
        margin-bottom: 20px
    }

    #about-contact .about .social-btn {
        display: -ms-flexbox;
        display: flex;
        display: -webkit-box;
        display: -webkit-flex;
        -ms-flex-wrap: wrap;
        flex-wrap: wrap;
        -webkit-flex-wrap: wrap
    }

    #about-contact .about .social {
        margin-bottom: 0
    }

    #about-contact .about .social a {
        margin: 0 12px 0 0;
        text-align: center
    }

    #about-contact .contact form .txt {
        font-size: 22px;
        direction: ltr
    }

    #about-contact .contact form .btn-phone {
        display: -ms-flexbox;
        display: flex;
        display: -webkit-box;
        display: -webkit-flex;
        direction: ltr;
        -ms-justify-content: center;
        -ms-flex-pack: distribute;
        justify-content: center;
        -webkit-box-pack: center;
        -webkit-justify-content: center;
        margin: 50px -14px 0
    }

    #about-contact .contact .phone,#about-contact .contact form .button {
        width: calc(50% - 28px);
        margin: 0 14px
    }

    #about-contact .contact form .button {
        margin-bottom: 0
    }

    #about-contact.ac-porfolio .ac-tab {
        width: 100%;
        direction: ltr;
        text-align: center
    }

    #about-contact.ac-porfolio .ac-tab .ac-content {
        width: 100%
    }

    #partner {
        height: auto;
        overflow: visible;
        border-bottom: 1px solid #2d2d2f
    }

    #address .inner {
        display: -ms-flexbox;
        display: flex;
        display: -webkit-box;
        display: -webkit-flex
    }

    #address .item {
        width: 50%;
        padding-left: 30px;
        padding-right: 30px
    }

    #address .address-1 {
        border-bottom: none
    }

    #footer .inner {
        padding-right: 30px;
        padding-left: 30px;
        -ms-flex-wrap: nowrap;
        flex-wrap: nowrap;
        -webkit-flex-wrap: nowrap
    }

    #footer .copyright {
        width: auto;
        -webkit-box-ordinal-group: 1;
        -ms-flex-order: 0;
        order: 0;
        margin: 0 10px;
        flex: 1 0;
        -webkit-box-flex: 1;
        -ms-flex: 1 0;
        -webkit-flex: 1 0
    }
}

@media screen and (min-width: 1200px) {
    #header .banner .top {
        border-top-width:5px
    }

    #header .banner .inner-top {
        padding: 58px 60px
    }

    #header .banner .top .contact,#header .banner .top .menu-mobile {
        display: none
    }

    #header .banner .top .logo {
        width: 164px
    }

    #header .banner .top .logo img {
        height: 69px
    }

    #header .banner .top .breadcrumbs {
        display: -ms-flexbox;
        display: flex;
        display: -webkit-box;
        display: -webkit-flex;
        -ms-align-items: center;
        -ms-flex-align: center;
        align-items: center;
        -webkit-align-items: center;
        -webkit-box-align: center
    }

    #header .banner .top .breadcrumbs h3 {
        margin: 0;
        font-size: 16px;
        letter-spacing: 1px;
        color: hsla(0,0%,100%,.5);
        font-weight: 400
    }

    #header .banner .top .breadcrumbs h3.active,#header .banner .top .breadcrumbs h3.active a {
        color: #fff
    }

    #header .banner .top .breadcrumbs h3 a {
        color: hsla(0,0%,100%,.5)
    }

    #header .banner .top .breadcrumbs h3 a:hover {
        color: #fff
    }

    #header .banner .top .breadcrumbs .icon {
        width: 65px;
        height: 1px;
        background: rgba(255,255,253,.25);
        position: relative;
        margin: 0 20px
    }

    #header .banner .top .breadcrumbs .icon:before {
        content: "";
        width: 5px;
        height: 5px;
        background: #f60;
        position: absolute;
        top: -2px;
        left: 0;
        -webkit-transform: rotate(45deg);
        transform: rotate(45deg)
    }

    #header .banner .top .contact-desktop {
        display: -ms-flexbox;
        display: flex;
        display: -webkit-box;
        display: -webkit-flex;
        -ms-align-items: center;
        -ms-flex-align: center;
        align-items: center;
        -webkit-align-items: center;
        -webkit-box-align: center
    }

    #header .banner .top .social-contact {
        display: none
    }

    #header .banner .top .social-contact a {
        border: 2px solid hsla(0,0%,100%,.2);
        display: block;
        width: 60px;
        text-align: center;
        padding: 4px 0;
        margin-right: 12px
    }

    #header .banner .top .social-contact a:hover {
        border-color: hsla(0,0%,100%,.5)
    }

    #header .banner .top .social-contact img {
        height: 28px
    }

     .btn-contact {
        display: -ms-flexbox;
        display: flex;
        display: -webkit-box;
        display: -webkit-flex;
        -ms-align-items: center;
        -ms-flex-align: center;
        align-items: center;
        -webkit-align-items: center;
        -webkit-box-align: center;
        color: #fff;
        letter-spacing: 1px;
        border: 2px solid #f60;
        padding: 7px 58px 7px 25px;
        font-size: 16px;
        font-weight: 400;
        background: url(/images/ico_arrow_btn.png?97d85172fe91a3553275bfa176473f56) right 21px center no-repeat
    }

     .btn-contact:hover {
        background-color: #f60;
        background-image: url(/images/ico_arrow_btn_hover.png?8b22b33f7f15136745b51b81e3222268)
    }

    #header .banner .social {
        position: absolute;
        top: 50%;
        left: 60px;
        -webkit-transform: translateY(-50%);
        transform: translateY(-50%);
        display: block;
        margin-top: 60px;
        z-index: 30
    }

    #header .banner .social-inner {
        display: -webkit-inline-box;
        display: -ms-inline-flexbox;
        display: inline-flex;
        -webkit-transform: rotate(-90deg) translate(-50%,-5px);
        transform: rotate(-90deg) translate(-50%,-5px);
        -webkit-transform-origin: left top;
        transform-origin: left top
    }

    #header .banner .social-inner a {
        color: hsla(0,0%,100%,.5);
        font-size: 16px;
        letter-spacing: 1px;
        display: -ms-flexbox;
        display: flex;
        display: -webkit-box;
        display: -webkit-flex;
        -ms-align-items: center;
        -ms-flex-align: center;
        align-items: center;
        -webkit-align-items: center;
        -webkit-box-align: center
    }

    #header .banner .social-inner a:hover {
        color: #fff
    }

    #header .banner .social-inner a:first-child {
        margin-right: 90px
    }

    #header .banner .social-inner a:before {
        content: "";
        width: 4px;
        height: 4px;
        background: #f60;
        display: block;
        -webkit-transform: rotate(45deg);
        transform: rotate(45deg);
        margin-right: 8px
    }

    #header .banner .slide h1 {
        font-size: 36px;
        padding-bottom: 60px
    }

    #header .banner .slide h1 strong {
        font-size: 60px
    }

    #header .banner .mouse img {
        height: 52px
    }

    #header .menu .menu-item a {
        border-top-width: 8px
    }

    #header .menu .menu-item img {
        height: 90px
    }

    #header .menu .menu-item span {
        font-size: 18px
    }

    #header.header-porfolio .banner .top .logo {
        width: 308px
    }

    #header.header-porfolio .banner .top .logo img {
        height: 44px
    }

    #header.header-porfolio .banner .top.is-sticky .logo img {
        height: 40px
    }

    #header.header-porfolio .banner .top .breadcrumbs .icon:before {
        left: auto;
        right: 0
    }

    #header.header-porfolio .banner .inner-top {
        padding-top: 26px;
        padding-bottom: 26px
    }

    #header.header-porfolio .banner .social-contact {
        display: -ms-flexbox;
        display: flex;
        display: -webkit-box;
        display: -webkit-flex
    }

    #list-video .item {
        width: 33.33%
    }

    #list-video.lv-homepage .item:nth-child(n+5) {
        display: block
    }

    #list-video .item .info {
        padding: 0 60px 50px;
        -webkit-transition: all .3s;
        transition: all .3s
    }

    #list-video .item .info .cate {
        font-size: 18px
    }

    #list-video .item .info h3 {
        font-size: 36px;
        margin-bottom: 8px
    }

    #list-video .item .des {
        font-size: 22px;
        font-weight: 100;
        padding-top: 10px;
        line-height: 1.2
    }

    #list-video .item .info:after {
        content: "";
        display: block;
        width: 100px;
        height: 80px;
        background: url(/images/products_ico_play.png?98ccb9a65451cf31706c2b927dd0e08d) 50% no-repeat #fe6501;
        margin-top: 25px;
        display: none
    }

    #list-video .item:not(.lv-big) .info:after {
        width: 80px;
        height: 66px;
        background-size: 50px auto
    }

    #list-video .item.lv-big {
        width: 50%
    }

    #list-video .item:lv-big .info {
        padding-bottom: 65px
    }

    #list-video .item:hover .info {
        padding-bottom: 8px
    }

    #list-video .item:hover .des,#list-video .item:hover .info:after {
        display: block
    }

    #list-video .item:hover:before {
        background: #fe6402
    }

    #load-more-video {
        padding-top: 55px;
        padding-bottom: 55px
    }

    #about-contact .ac-inner {
        max-width: 1260px;
        margin: 0 auto;
        padding-bottom: 110px
    }

    #about-contact .about .content-inner {
        display: -ms-flexbox;
        display: flex;
        display: -webkit-box;
        display: -webkit-flex;
        -ms-flex-direction: row-reverse;
        flex-direction: row-reverse;
        -webkit-box-orient: horizontal;
        -webkit-box-direction: reverse
    }

    #about-contact .about .img {
        width: 50%;
        margin-bottom: 0;
        height: 323px
    }

    #about-contact .about .info-social {
        width: 50%;
        padding: 50px 50px 0 0
    }

    #about-contact .title {
        border-bottom-width: 8px;
        padding-top: 110px
    }

    #partner .inner {
        max-width: 1200px;
        margin: 0 auto;
        height: 250px
    }

    #partner img {
        width: 220px
    }

    #address .item {
        padding-top: 160px;
        padding-bottom: 160px
    }

    #address .inner-item {
        width: 325px;
        margin: 0 auto
    }

    #footer .inner {
        padding-left: 60px;
        padding-right: 60px
    }
}

.slick-slider {
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    -ms-touch-action: pan-y;
    touch-action: pan-y;
    -webkit-tap-highlight-color: transparent
}

.slick-list,.slick-slider {
    position: relative;
    display: block
}

.slick-list {
    overflow: hidden;
    margin: 0;
    padding: 0
}

.slick-list:focus {
    outline: none
}

.slick-list.dragging {
    cursor: pointer;
    cursor: hand
}

.slick-slider .slick-list,.slick-slider .slick-track {
    -webkit-transform: translateZ(0);
    transform: translateZ(0)
}

.slick-track {
    position: relative;
    left: 0;
    top: 0;
    display: block;
    margin-left: auto;
    margin-right: auto
}

.slick-track:after,.slick-track:before {
    content: "";
    display: table
}

.slick-track:after {
    clear: both
}

.slick-loading .slick-track {
    visibility: hidden
}

.slick-slide {
    float: left;
    height: 100%;
    min-height: 1px;
    display: none
}

[dir=rtl] .slick-slide {
    float: right
}

.slick-slide img {
    display: block
}

.slick-slide.slick-loading img {
    display: none
}

.slick-slide.dragging img {
    pointer-events: none
}

.slick-initialized .slick-slide {
    display: block
}

.slick-loading .slick-slide {
    visibility: hidden
}

.slick-vertical .slick-slide {
    display: block;
    height: auto;
    border: 1px solid transparent
}

.slick-arrow.slick-hidden {
    display: none
}

    
</style>
