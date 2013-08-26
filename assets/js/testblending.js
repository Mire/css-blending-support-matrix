/*
Copyright (C) 2013 Adobe Systems, Incorporated. All rights reserved.

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/
$(function () {
    var Util = {
        prefixOM: function (name) {
            return PrefixFree.Prefix.toLowerCase() + name.replace(/^[a-z]/, function($0){ return $0.toUpperCase(); });
        },
        prefixMethod: function (obj, method) {
            if (obj[method]) {
                return obj[method].bind(obj);
            } else {
                var result = obj[Util.prefixOM(method)];
                return result ? result.bind(obj) : null;
            }
        }
    };

    var $blended;
    function setup(){
        $blended.css("background-blend-mode", "multiply");
    }
    function teardown(){
        $blended.remove();
    }

    // Sandbox a little the initial setup
    (function() {
        var $div = $('<div>&nbsp;</div>').appendTo($('body'));
        var $iframe = $('<iframe seamless="true" src="about:blank"/>');
        $iframe.load(function() {
            $blended = $div;
            $iframe.remove();
            runTests();
        }).appendTo($('body'));
    })();
    
    function runTests() {
        module("CSS Blending basic", { "setup": setup, "teardown": teardown });

        test("CSS background-blend-mode", function(){
            blendModes = ["normal", "multiply", "screen", "overlay", "darken", "lighten","color-dodge", "color-burn", "hard-light", "soft-light", "difference", "exclusion", "hue", "saturation", "color", "luminosity"]
            for( j=0; j<blendModes.length; j++ )
            {
                $blended.css("background-blend-mode", blendModes[j]);
                equal($blended.css("background-blend-mode"), blendModes[j], "Correct parsing for background-blend-mode");
            }
        });

        test("CSS mix-blend-mode", function(){
            blendModes = ["normal", "multiply", "screen", "overlay", "darken", "lighten","color-dodge", "color-burn", "hard-light", "soft-light", "difference", "exclusion", "hue", "saturation", "color", "luminosity"]
            for( j=0; j<blendModes.length; j++ )
            {
                $blended.css("mix-blend-mode", blendModes[j]);
                equal($blended.css("mix-blend-mode"), blendModes[j], "Correct parsing for mix-blend-mode");
            }
        });

        test("CSS canvas blend-mode", function(){
            $canvas = $('<canvas></canvas>').appendTo($('body'));
            $ctx = $canvas[0].getContext('2d');

            blendModes = ["normal", "multiply", "screen", "overlay", "darken", "lighten","color-dodge", "color-burn", "hard-light", "soft-light", "difference", "exclusion", "hue", "saturation", "color", "luminosity"]
            
            for( j=0; j<blendModes.length; j++ )
            {
                $ctx.globalCompositeOperation = blendModes[j];
                equal($ctx.globalCompositeOperation, blendModes[j], "Correct parsing for canvas blend-mode");
            }
        });

        test("CSS isolation", function(){
            isolate = ["auto", "isolate"];

            for( j=0; j<isolate.length; j++ )
            {
                $blended.css("isolation-mode", isolate[j]);
                equal($blended.css("isolation-mode"), isolate[j], "Correct parsing for isolation");
            }
        });

    }
})   