(function (win) {
    class WordRenderer {
        /**
         * 默認構造方法，默認父容器為document.body
         */
        constructor() {
            this.parentElement = document.body;
        }
        /**
         * 渲染單個文字
         * @param {string} word 要渲染的文字
         */
        render(word) {
            let h1 = document.createElement("h1");
            h1.innerHTML = word;
            h1.style.color = "#2177C7";
            h1.style.letterSpacing = "2px";
            h1.style.textDecoration = "underline";
            h1.style.textTransform = "capitalize";
            h1.style.userSelect = "none";
            this.parentElement.appendChild(h1);
        }

        /**
         * 設置父容器
         * @param {HTMLElement} parentElement 父容器
         */
        setParentElement(parentElement) {
            this.parentElement = parentElement;
        }
    }

    class SentenceRenderer {
        /**
         * 帶參構造方法
         * @param {string} parentSelector 父容器css選擇器
         */
        constructor(parentSelector) {
            this.__init(parentSelector);
        }
        /**
         * 初始化
         * @param {string} parentSelector 父容器css選擇器
         */
        __init(parentSelector) {
            this.parentElement = document.querySelector(parentSelector);
            if (!this.parentElement) throw new Error("Can't find parentElement");
            this.parentElement.style.backgroundColor = "#efefef";
            this.parentElement.style.padding = "10px";
            this.words = this.parentElement.innerText.split(/\s+/);
            [...this.parentElement.childNodes].forEach(c => c.remove());

            let defaultRenderer = new DefaultRenderer();
            defaultRenderer.setParentElement(this.parentElement);
            this.setWordRenderer(defaultRenderer);
        }
        /**
         * 開始渲染
         */
        render() {
            this.words.forEach(word => this.wordRenderer.render(word));
        }

        /**
         * 設置單個文字渲染器
         * @param {WordRenderer} wordRenderer 單個文字渲染器
         * @returns 當前SentenceRenderer實例
         */
        setWordRenderer(wordRenderer) {
            if (!wordRenderer instanceof WordRenderer) {
                throw new Error("Not a valid WordRenderer");
            }
            this.wordRenderer = wordRenderer;
            this.wordRenderer.parentElement = this.parentElement;
            return this;
        }
    }

    /**
     * 默認渲染器
     */
    class DefaultRenderer extends WordRenderer {
        render(word) {
            let firstCharacter = word.substring(0, 1).toUpperCase();
            let leftCharacters = word.substring(1);
            let firstSpan = document.createElement("span");

            firstSpan.style.fontSize = "3em";
            firstSpan.appendChild(document.createTextNode(firstCharacter));
            let leftSpan = document.createElement("span");
            leftSpan.style.fontSize = "1.2em";
            leftSpan.style.letterSpacing = "2px";
            leftSpan.appendChild(document.createTextNode(leftCharacters));
            let rowDiv = document.createElement("div");
            rowDiv.appendChild(firstSpan);
            rowDiv.style.fontSize = "2em";
            rowDiv.style.fontFamily = "times";
            rowDiv.style.color = "#2177C7";
            rowDiv.style.cursor = "pointer";
            rowDiv.style.userSelect = "none";
            rowDiv.style.fontWeight = "bolder";
            rowDiv.style.margin = "10px 0";
            rowDiv.appendChild(leftSpan);
            firstSpan.style.transition = "all 0.4s ease";
            rowDiv.addEventListener("mouseenter", function () {
                firstSpan.style.color = "red";
            });
            rowDiv.addEventListener("mouseleave", function () {
                firstSpan.style.color = "#2177C7";
            });
            this.parentElement.appendChild(rowDiv);
        }
    }
    win.WordRenderer = WordRenderer;
    win.DefaultRenderer = DefaultRenderer;
    win.SentenceRenderer = SentenceRenderer;
})(window)