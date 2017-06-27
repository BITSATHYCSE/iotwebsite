$(function(){
    'use strict';
    // bind change event to select
    $('.options.reset-settings.halloween-settings').on('change', function () {
        var url = $(this).val(); // get selected value
        if (url) { // require a URL
            window.location = url; // redirect
        }
        return false;
    });
});

'use strict';
var themeConfig = {
    init: false,
    options: {
        color: 'red-1',
        background: 'dark',
        layout: 'wide',
        direction: 'ltr'
    },
    colors: [
        {
            'Hex': '#dc143c',
            'colorName': 'red-1'
        },
        {
            'Hex': '#d80018',
            'colorName': 'red-2'
        },
        {
            'Hex': '#386090',
            'colorName': 'blue-1'
        },
        {
            'Hex': '#4478b2',
            'colorName': 'blue-2'
        },
        {
            'Hex': '#2e9063',
            'colorName': 'green-1'
        },
        {
            'Hex': '#89c144',
            'colorName': 'green-2'
        },
        {
            'Hex': '#f1be03',
            'colorName': 'yellow-1'
        },
        {
            'Hex': '#e3c552',
            'colorName': 'yellow-2'
        },
        {
            'Hex': '#e47911',
            'colorName': 'orange-1'
        },
        {
            'Hex': '#e48f4c',
            'colorName': 'orange-2'
        },
        {
            'Hex': '#563d7c',
            'colorName': 'purple-1'
        },
        {
            'Hex': '#685ab1',
            'colorName': 'purple-2'
        },
        {
            'Hex': '#ec005f',
            'colorName': 'pink'
        },
        {
            'Hex': '#b8a279',
            'colorName': 'cumin'
        }
    ],
    backgrounds: [
        {
            'Hex': '#F5F5F5',
            'colorName': 'light'
        },
        {
            'Hex': '#0d1d31',
            'colorName': 'dark'
        }
    ],
    layouts: [
        {
            'Hex': '#999999',
            'layoutName': 'wide'
        },
        {
            'Hex': '#999999',
            'layoutName': 'boxed'
        }
    ],
    directions: [
        {
            'Hex': '#999999',
            'directionName': 'ltr'
        },
        {
            'Hex': '#999999',
            'directionName': 'rtl'
        }
    ],
    initialize: function () {
        var $this = this;
        if (this.init) return;

        $('head').append($('<link rel="stylesheet">').attr('href', 'assets/js/theme-config.css'));
        $this.build();
        $this.events();

        if ($.cookie('color') != null) {
            $this.setColor($.cookie('color'));
        } else {
            $this.setColor(themeConfig.options.color);
        }

        if ($.cookie('background') != null) {
            $this.setBackground($.cookie('background'));
            $this.setBackground('dark');
        } else {
            //$this.setBackground(themeConfig.options.background);
            $this.setBackground('dark');
        }

        if ($.cookie('layout') != null) {
            $this.setLayout($.cookie('layout'));
        } else {
            $this.setLayout(themeConfig.options.layout);
        }

        if ($.cookie('direction') != null) {
            $this.setDirection($.cookie('direction'));
        } else {
            $this.setDirection(themeConfig.options.direction);
        }

        if ($.cookie('init') == null) {
            $this.container.find('.theme-config-head a').click();
            $.cookie('init', true);
        }

        $this.init = true;
    },
    events: function () {
        var $this = this;
        $this.container.find('.theme-config-head a').click(function (e) {
            e.preventDefault();
            if ($this.container.hasClass('active')) {
                $this.container.animate({
                    right: '-' + $this.container.width() + 'px'
                }, 300).removeClass('active');
            } else {
                $this.container.animate({
                    right: '0'
                }, 300).addClass('active');
            }
        });
        if ($.cookie('showConfig') != null) {
            $this.container.find('.theme-config-head a').click();
            $.removeCookie('showConfig');
        }
    },
    setColor: function (color) {
        var $this = this;
        var $colorConfigLink = $('#theme-config-link');
        if (this.isChanging) {
            return false;
        }
        $colorConfigLink.attr('href', 'assets/css/theme-' + color + '.css');
        $.cookie('color', color);
    },
    setBackground: function (background) {
        $.each(themeConfig.backgrounds, function (i, value) {
            $('body').removeClass('body-' + themeConfig.backgrounds[i].colorName);
        });
        $('body').addClass('body-' + background);
        $.cookie('background', background);
        if (background == 'dark') {
            $('.partners-carousel img').each(function () {
                var arr = $(this).attr('src').split('/');
                $(this).attr('src', 'assets/img/partner/' + background + '/' + arr[arr.length - 1]);
            });
        } else {
            $('.partners-carousel img').each(function () {
                var arr = $(this).attr('src').split('/');
                $(this).attr('src', 'assets/img/partner/light/' + arr[arr.length - 1]);
            });
        }
    },
    setLayout: function (layout) {
        //$('body').removeAttr('class');
        $('body').removeClass('wide').removeClass('boxed');
        $('body').addClass(layout);
        $.cookie('layout', layout);
        setTimeout(function(){$.waypoints('refresh');},100);
    },
    setDirection: function (direction) {
        $('body').removeClass('ltr').removeClass('rtl');
        $('body').addClass(direction);
        $.cookie('direction', direction);
    },
    reset: function () {
        $.removeCookie('color');
        $.removeCookie('background');
        $.removeCookie('layout');
        $.removeCookie('direction');
        $.cookie('showConfig', true);
        window.location.reload();
    }
};
themeConfig.initialize();
