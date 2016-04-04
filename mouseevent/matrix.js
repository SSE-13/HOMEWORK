var render;
(function (render) {
    var PI = Math.PI;
    var HalfPI = PI / 2;
    var PacPI = PI + HalfPI;
    var TwoPI = PI * 2;
    var DEG_TO_RAD = Math.PI / 180;
    /**
     * @private
     */
    function cos(angle) {
        switch (angle) {
            case HalfPI:
            case -PacPI:
                return 0;
            case PI:
            case -PI:
                return -1;
            case PacPI:
            case -HalfPI:
                return 0;
            default:
                return Math.cos(angle);
        }
    }
    /**
     * @private
     */
    function sin(angle) {
        switch (angle) {
            case HalfPI:
            case -PacPI:
                return 1;
            case PI:
            case -PI:
                return 0;
            case PacPI:
            case -HalfPI:
                return -1;
            default:
                return Math.sin(angle);
        }
    }
    /**
     * @private
     */
    render.$cos = cos;
    /**
     * @private
     */
    render.$sin = sin;
    var matrixPool = [];
    /**
     * @language en_US
     * The Matrix class represents a transformation matrix that determines how to map points from one coordinate space to
     * another. You can perform various graphical transformations on a display object by setting the properties of a Matrix
     * object, applying that Matrix object to the matrix property of a display object, These transformation functions include
     * translation (x and y repositioning), rotation, scaling, and skewing.
     * @version Egret 2.4
     * @platform Web,Native
     * @includeExample egret/geom/Matrix.ts
     */
    /**
     * @language zh_CN
     * Matrix 类表示一个转换矩阵，它确定如何将点从一个坐标空间映射到另一个坐标空间。
     * 您可以对一个显示对象执行不同的图形转换，方法是设置 Matrix 对象的属性，将该 Matrix
     * 对象应用于显示对象的 matrix 属性。这些转换函数包括平移（x 和 y 重新定位）、旋转、缩放和倾斜。
     * @version Egret 2.4
     * @platform Web,Native
     * @includeExample egret/geom/Matrix.ts
     */
    var Matrix = (function () {
        /**
         * @language en_US
         * Creates a new Matrix object with the specified parameters.
         * @param a The value that affects the positioning of pixels along the x axis when scaling or rotating an image.
         * @param b The value that affects the positioning of pixels along the y axis when rotating or skewing an image.
         * @param c The value that affects the positioning of pixels along the x axis when rotating or skewing an image.
         * @param d The value that affects the positioning of pixels along the y axis when scaling or rotating an image..
         * @param tx The distance by which to translate each point along the x axis.
         * @param ty The distance by which to translate each point along the y axis.
         * @version Egret 2.4
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 使用指定参数创建一个 Matrix 对象
         * @param a 缩放或旋转图像时影响像素沿 x 轴定位的值。
         * @param b 旋转或倾斜图像时影响像素沿 y 轴定位的值。
         * @param c 旋转或倾斜图像时影响像素沿 x 轴定位的值。
         * @param d 缩放或旋转图像时影响像素沿 y 轴定位的值。
         * @param tx 沿 x 轴平移每个点的距离。
         * @param ty 沿 y 轴平移每个点的距离。
         * @version Egret 2.4
         * @platform Web,Native
         */
        function Matrix(a, b, c, d, tx, ty) {
            if (a === void 0) { a = 1; }
            if (b === void 0) { b = 0; }
            if (c === void 0) { c = 0; }
            if (d === void 0) { d = 1; }
            if (tx === void 0) { tx = 0; }
            if (ty === void 0) { ty = 0; }
            this.a = a;
            this.b = b;
            this.c = c;
            this.d = d;
            this.tx = tx;
            this.ty = ty;
        }
        /**
         * @language zh_CN
         * 返回将 Matrix 对象表示的几何转换应用于指定点所产生的结果。
         * @returns 一个字符串，它包含 Matrix 对象的属性值：a、b、c、d、tx 和 ty。
         * @version Egret 2.4
         * @platform Web,Native
         */
        Matrix.prototype.toString = function () {
            return "(a=" + this.a + ", b=" + this.b + ", c=" + this.c + ", d=" + this.d + ", tx=" + this.tx + ", ty=" + this.ty + ")";
        };
        /**
         * 根据显示对象的属性确定当前矩阵
         */
        Matrix.prototype.updateFromDisplayObject = function (x, y, scaleX, scaleY, rotation) {
            this.tx = x;
            this.ty = y;
            var skewX, skewY;
            skewX = skewY = rotation / 180 * Math.PI;
            ;
            if ((skewX == 0 || skewX == TwoPI) && (skewY == 0 || skewY == TwoPI)) {
                this.a = scaleX;
                this.b = this.c = 0;
                this.d = scaleY;
                return;
            }
            var u = cos(skewX);
            var v = sin(skewX);
            if (skewX == skewY) {
                this.a = u * scaleX;
                this.b = v * scaleX;
            }
            else {
                this.a = cos(skewY) * scaleX;
                this.b = sin(skewY) * scaleX;
            }
            this.c = -v * scaleY;
            this.d = u * scaleY;
        };
        return Matrix;
    }());
    render.Matrix = Matrix;
})(render || (render = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWF0cml4LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibWF0cml4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUVBLElBQU8sTUFBTSxDQXNQWjtBQXRQRCxXQUFPLE1BQU0sRUFBQyxDQUFDO0lBRVgsSUFBSSxFQUFFLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQztJQUNqQixJQUFJLE1BQU0sR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDO0lBQ3BCLElBQUksS0FBSyxHQUFHLEVBQUUsR0FBRyxNQUFNLENBQUM7SUFDeEIsSUFBSSxLQUFLLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQztJQUNuQixJQUFJLFVBQVUsR0FBVyxJQUFJLENBQUMsRUFBRSxHQUFHLEdBQUcsQ0FBQztJQUN2Qzs7T0FFRztJQUNILGFBQWEsS0FBYTtRQUN0QixNQUFNLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBQ1osS0FBSyxNQUFNLENBQUM7WUFDWixLQUFLLENBQUMsS0FBSztnQkFDUCxNQUFNLENBQUMsQ0FBQyxDQUFDO1lBQ2IsS0FBSyxFQUFFLENBQUM7WUFDUixLQUFLLENBQUMsRUFBRTtnQkFDSixNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDZCxLQUFLLEtBQUssQ0FBQztZQUNYLEtBQUssQ0FBQyxNQUFNO2dCQUNSLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFDYjtnQkFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUMvQixDQUFDO0lBQ0wsQ0FBQztJQUVEOztPQUVHO0lBQ0gsYUFBYSxLQUFhO1FBQ3RCLE1BQU0sQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7WUFDWixLQUFLLE1BQU0sQ0FBQztZQUNaLEtBQUssQ0FBQyxLQUFLO2dCQUNQLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFDYixLQUFLLEVBQUUsQ0FBQztZQUNSLEtBQUssQ0FBQyxFQUFFO2dCQUNKLE1BQU0sQ0FBQyxDQUFDLENB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