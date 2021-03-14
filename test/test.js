var assert = require('assert');
var convert = require('../conversion_functions.js')
describe('conversion functions',function(){
    describe('convert_to_md()',function(){
        it('should convert correctly markdown',function(){
            data="int\tfloat\tletter\tstring\n1\t0.23702475727459377\ta\tUruguay\n2\t0.22432726412955337\tb\tSpain\n3\t0.9169709001544447\tc\tTest";
            outcome="| int | float               | letter | string  |\n|-----|---------------------|--------|---------|\n| 1   | 0.23702475727459377 | a      | Uruguay |\n| 2   | 0.22432726412955337 | b      | Spain   |\n| 3   | 0.9169709001544447  | c      | Test    |";
            assert.equal(outcome,convert.convert_to_md(data));
        })
    });
    describe('convert_to_listtable()',function(){
        it('should convert correctly listtable',function(){
            data="int\tfloat\tletter\tstring\n1\t0.23702475727459377\ta\tUruguay\n2\t0.22432726412955337\tb\tSpain\n3\t0.9169709001544447\tc\tTest";
            outcome=".. list-table:: Title\n\t:widths: 25 25 25 25\n\t:header-rows: 1\n\n\t* - int\n\t  - float\n\t  - letter\n\t  - string\n\t* - 1\n\t  - 0.23702475727459377\n\t  - a\n\t  - Uruguay\n\t* - 2\n\t  - 0.22432726412955337\n\t  - b\n\t  - Spain\n\t* - 3\n\t  - 0.9169709001544447\n\t  - c\n\t  - Test"
            assert.equal(outcome,convert.convert_to_listtable(data))
        })
    });
    describe('convert_to_variant1()',function(){
        it('should convert correctly variant1',function(){
            data="int\tfloat\tletter\tstring\n1\t0.23702475727459377\ta\tUruguay\n2\t0.22432726412955337\tb\tSpain\n3\t0.9169709001544447\tc\tTest";
            outcome = "\t+-----+---------------------+--------+---------+\n\t| int | float               | letter | string  |\n\t+=====+=====================+========+=========+\n\t| 1   | 0.23702475727459377 | a      | Uruguay |\n\t+-----+---------------------+--------+---------+\n\t| 2   | 0.22432726412955337 | b      | Spain   |\n\t+-----+---------------------+--------+---------+\n\t| 3   | 0.9169709001544447  | c      | Test    |\n\t+-----+---------------------+--------+---------+"
            assert.equal(outcome,convert.convert_to_variant1(data))
        })
    });
    describe('convert_to_variant2()',function(){
        it('should convert correctly variant2',function(){
            data="int\tfloat\tletter\tstring\n1\t0.23702475727459377\ta\tUruguay\n2\t0.22432726412955337\tb\tSpain\n3\t0.9169709001544447\tc\tTest";
            outcome = "\t=== =================== ====== =======\n\tint float               letter string \n\t=== =================== ====== =======\n\t1   0.23702475727459377 a      Uruguay\n\t2   0.22432726412955337 b      Spain  \n\t3   0.9169709001544447  c      Test   \n\t=== =================== ====== ======="
            assert.equal(outcome,convert.convert_to_variant2(data))
        })
    });
    describe('convert_to_md() with alignment',function(){
        it('should convert correctly md with alignment',function(){
            data="^ranimal\t^cweight\tcolor\ndog\t30lb\ttan\ndog\t85lb\tblack\ncat\t18lb\tcalico" 
            outcome="| animal | weight | color  |\n|-------:|:------:|--------|\n| dog    | 30lb   | tan    |\n| dog    | 85lb   | black  |\n| cat    | 18lb   | calico |"
            assert.equal(outcome,convert.convert_to_md(data))
        })
    });
    describe('convert_to_listtable() with alignment',function(){
        it('should convert correctly rst listtable with alignment (i.e. ignoring it)',function(){
            data="^ranimal\t^cweight\tcolor\ndog\t30lb\ttan\ndog\t85lb\tblack\ncat\t18lb\tcalico" 
            outcome=".. list-table:: Title\n\t:widths: 33 33 33\n\t:header-rows: 1\n\n\t* - animal\n\t  - weight\n\t  - color\n\t* - dog\n\t  - 30lb\n\t  - tan\n\t* - dog\n\t  - 85lb\n\t  - black\n\t* - cat\n\t  - 18lb\n\t  - calico" 
            assert.equal(outcome,convert.convert_to_listtable(data))
        })
    });
    describe('convert_to_variant1() with alignment',function(){
        it('should convert correctly rst variant1 with alignment (i.e. ignoring it)',function(){
            data="^ranimal\t^cweight\tcolor\ndog\t30lb\ttan\ndog\t85lb\tblack\ncat\t18lb\tcalico" 
            outcome="\t+--------+--------+--------+\n\t| animal | weight | color  |\n\t+========+========+========+\n\t| dog    | 30lb   | tan    |\n\t+--------+--------+--------+\n\t| dog    | 85lb   | black  |\n\t+--------+--------+--------+\n\t| cat    | 18lb   | calico |\n\t+--------+--------+--------+" 
            assert.equal(outcome,convert.convert_to_variant1(data))
        })
    });
    describe('convert_to_variant2() with alignment',function(){
        it('should convert correctly rst variant2 with alignment (i.e. ignoring it)',function(){
            data="^ranimal\t^cweight\tcolor\ndog\t30lb\ttan\ndog\t85lb\tblack\ncat\t18lb\tcalico" 
            outcome= "\t====== ====== ======\n\tanimal weight color \n\t====== ====== ======\n\tdog    30lb   tan   \n\tdog    85lb   black \n\tcat    18lb   calico\n\t====== ====== ======"
           assert.equal(outcome,convert.convert_to_variant2(data))
        })
    });
})
//some more possible test cases, should maybe implement more
//data="animal\tweight\tcolor\n dog\t30lb\ttan\n dog\t85lb\tblack\n cat\t18lb\tcalico" 
//data="^ranimal\t^cweight\tcolor\n dog\t30lb\ttan\n dog\t85lb\tblack\n cat\t18lb\tcalico" 
//data="animal\t^cweight\t^lcolor\n dog\t30lb\ttan\n dog\t85lb\tblack\n cat\t18lb\tcalico" 
