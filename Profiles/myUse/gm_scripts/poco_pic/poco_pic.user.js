// ==UserScript==
// @name        poco auto jump
// @description:zh-CN poco auto jump to gallery
// @namespace   poco-pic
// @icon        data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACEUlEQVQ4jZ2Q30tTUQDHz3+h9VdMw4dhmNyS7MEULEqi6CV6yEeJcSPfwqIepIgewrJ0QUFPvXiJCnqwH0q6NTHNLdG2obtud/dcnds5l08P0+XmJOjhA9+H8/2cc75CCCECYw3s0jxen8DzQwRuhOh6epqW8UZawo0IIYRoCTfyZPX8P+kOn8UwLQzTojfcQWg2SGCsgX2CuwsnGYy1cWrkHIZpcezOTVqHBirlN9F0Je8T3FvsZDDWRv90Ez0vLlcOvl7IkMgX2CiUWFqXRJMO45FUtWBvORQJ0vuymwsjX/jlbOEUFW5JI1UZt6SZStjVgt1y/3QT12eOYpgWU2uSbFGRVxqpfLwdpPKJ2159QSgS5MyrHgzTYj67TXpbk1M+P1eTrEsPqX1iS3GyJV0tCEWCXPvaTNdoebzHn5K8i64xl5bklI8Qgunod1xdzvFUukYwG+TEgysYpsXbpMvyliKrfPK6jBCCb7Eocif/tms2uDTRjmFaTKYlqYLCLmkc5ZNXPq72kTW42q8WHB++ysOZFCubJTLF8r93y3sFTtbD2VbIWkHH/UEmVnKkC4qNkq5bltrH7huu5CpB+63bfEh6zGc8csrHrfN0u2+4Qm6r+FfQ+egihmnxPuHwI+PhHHB73Q2OPDuMYVp8zhb4uGgztyaJ25skNjYPLLraZ2xyuSwQQojWoQH+ByGE+APy/e1tpGm3xwAAAABJRU5ErkJggg==
// @include     http://photo.poco.cn/like/detail*
// @require      http://cdn.staticfile.org/jquery/1.8.2/jquery.min.js
// @version     1.1
// @grant       none
// ==/UserScript==
 $(
                function(){

                    $("h3.Title.fn.white a").attr("target","_self").get(0).click();

                }
        );
