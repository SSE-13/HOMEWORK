

module math {


    export class Point {
        x: number;
        y: number;
        constructor(x: number, y: number) {
            this.x = x;
            this.y = y;
        }
    }

    export function pointAppendMatrix(point: Point, m: Matrix): Point {
        var x = m.a * point.x + m.c * point.y + m.tx;
        var y = m.b * point.x + m.d * point.y + m.ty;
        return new Point(x, y);

    }

    /**
     * 使用伴随矩阵法求逆矩阵
     * http://wenku.baidu.com/view/b0a9fed8ce2f0066f53322a9
     */
    export function invertMatrix(m: Matrix): Matrix {


        var a = m.a;
        var b = m.b;
        var c = m.c;
        var d = m.d;
        var tx = m.tx;
        var ty = m.ty;

        var determinant = a * d - b * c;
        var result = new Matrix(1, 0, 0, 1, 0, 0);
        if (determinant == 0) {
            throw new Error("no invert");
        }

        determinant = 1 / determinant;
        var k = result.a = d * determinant;
        b = result.b = -b * determinant;
        c = result.c = -c * determinant;
        d = result.d = a * determinant;
        result.tx = -(k * tx + c * ty);
        result.ty = -(b * tx + d * ty);
        return result;

    }

    export function matrixAppendMatrix(m1: Matrix, m2: Matrix): Matrix {

        var result = new Matrix();
        result.a = m1.a * m2.a + m1.b * m2.c;
        result.b = m1.a * m2.b + m1.b * m2.d;
        result.c = m2.a * m1.c + m2.c * m1.d;
        result.d = m2.b * m1.c + m1.d * m2.d;
        result.tx = m2.a * m1.tx + m2.c * m1.ty + m2.tx;
        result.ty = m2.b * m1.tx + m2.d * m1.ty + m2.ty;
        return result;
    }

    var PI = Math.PI;
    var HalfPI = PI / 2;
    var PacPI = PI + HalfPI;
    var TwoPI = PI * 2;
    var DEG_TO_RAD: number = Math.PI / 180;
    /**
     * @private
     */
    function cos(angle: number): number {
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
    function sin(angle: number): number {
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
    export var $cos: (angle: number) => number = cos;
    /**
     * @private
     */
    export var $sin: (angle: number) => number = sin;


    var matrixPool: Matrix[] = [];
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
    export class Matrix {

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
        constructor(a: number = 1, b: number = 0, c: number = 0, d: number = 1, tx: number = 0, ty: number = 0) {
            this.a = a;
            this.b = b;
            this.c = c;
            this.d = d;
            this.tx = tx;
            this.ty = ty;
        }

        /**
         * @language en_US
         * The value that affects the positioning of pixels along the x axis when scaling or rotating an image.
         * @default 1
         * @version Egret 2.4
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 缩放或旋转图像时影响像素沿 x 轴定位的值
         * @default 1
         * @version Egret 2.4
         * @platform Web,Native
         */
        public a: number;
        /**
         * @language en_US
         * The value that affects the positioning of pixels along the y axis when rotating or skewing an image.
         * @default 0
         * @version Egret 2.4
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 旋转或倾斜图像时影响像素沿 y 轴定位的值
         * @default 0
         * @version Egret 2.4
         * @platform Web,Native
         */
        public b: number;
        /**
         * @language en_US
         * The value that affects the positioning of pixels along the x axis when rotating or skewing an image.
         * @default 0
         * @version Egret 2.4
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 旋转或倾斜图像时影响像素沿 x 轴定位的值
         * @default 0
         * @version Egret 2.4
         * @platform Web,Native
         */
        public c: number;
        /**
         * @language en_US
         * The value that affects the positioning of pixels along the y axis when scaling or rotating an image.
         * @default 1
         * @version Egret 2.4
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 缩放或旋转图像时影响像素沿 y 轴定位的值
         * @default 1
         * @version Egret 2.4
         * @platform Web,Native
         */
        public d: number;
        /**
         * @language en_US
         * The distance by which to translate each point along the x axis.
         * @default 0
         * @version Egret 2.4
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 沿 x 轴平移每个点的距离
         * @default 0
         * @version Egret 2.4
         * @platform Web,Native
         */
        public tx: number;

        /**
         * @language en_US
         * The distance by which to translate each point along the y axis.
         * @default 0
         * @version Egret 2.4
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 沿 y 轴平移每个点的距离
         * @default 0
         * @version Egret 2.4
         * @platform Web,Native
         */
        public ty: number;


        /**
         * @language zh_CN
         * 返回将 Matrix 对象表示的几何转换应用于指定点所产生的结果。
         * @returns 一个字符串，它包含 Matrix 对象的属性值：a、b、c、d、tx 和 ty。
         * @version Egret 2.4
         * @platform Web,Native
         */
        public toString(): string {
            return "(a=" + this.a + ", b=" + this.b + ", c=" + this.c + ", d=" + this.d + ", tx=" + this.tx + ", ty=" + this.ty + ")";
        }

        /**
         * 根据显示对象的属性确定当前矩阵
         */
        updateFromDisplayObject(x: number, y: number, scaleX: number, scaleY: number, rotation: number) {

            this.tx = x;
            this.ty = y;

            var skewX, skewY;
            skewX = skewY = rotation / 180 * Math.PI;;

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
            } else {
                this.a = cos(skewY) * scaleX;
                this.b = sin(skewY) * scaleX;
            }
            this.c = -v * scaleY;
            this.d = u * scaleY;

        }
    }
}