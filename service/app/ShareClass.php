<?php

namespace App;

use DOMDocument;
use DOMXPath;

class ShareClass
{
    /**
     * 영어로 변경
     * @param $text
     * @return string
     */
    static public function convertHangulToEnglish($text): string
    {
        /* 초중성에 대응하는 영문 알파벳 배열화 */
        // $LCtable = array("ㄱ", "ㄲ", "ㄴ", "ㄷ", "ㄸ", "ㄹ", "ㅁ", "ㅂ", "ㅃ", "ㅅ", "ㅆ", "ㅇ", "ㅈ", "ㅉ", "ㅊ", "ㅋ", "ㅌ", "ㅍ", "ㅎ");
        // $MVtable = array("ㅏ", "ㅐ", "ㅑ", "ㅒ", "ㅓ", "ㅔ", "ㅕ", "ㅖ", "ㅗ", "ㅘ", "ㅙ", "ㅚ", "ㅛ", "ㅜ", "ㅝ", "ㅞ", "ㅟ", "ㅠ", "ㅡ", "ㅢ", "ㅣ");
        // $TCtable = array("", "ㄱ", "ㄲ", "ㄳ", "ㄴ", "ㄵ", "ㄶ", "ㄷ", "ㄹ", "ㄺ", "ㄻ", "ㄼ", "ㄽ", "ㄾ", "ㄿ", "ㅀ", "ㅁ", "ㅂ", "ㅄ", "ㅅ", "ㅆ", "ㅇ", "ㅈ", "ㅊ", "ㅋ", "ㅌ", "ㅍ", "ㅎ");

        $LCetable = ["k", "kk", "n", "d", "tt", "l", "m", "b", "pp", "s", "ss", "", "j", "jj", "ch", "k", "t", "p", "h"];
        $MVetable = ["a", "ae", "ya", "yae", "eo", "e", "yeo", "ye", "o", "wa", "wae", "oe", "yo", "u", "wo", "we", "wi", "yu", "eu", "ui", "i"];
        $TCetable = ["", "g", "kk", "k", "n", "n", "n", "t", "l", "l", "l", "l", "l", "l", "l", "l", "m", "p", "p", "s", "ss", "ng", "j", "ch", "k", "t", "p", "h"];

        $returnValue = '';

        // UTF-8로 변환된 문장을 유니코드로 변환한다.
        $result = static::convertUtf8ToUnicode($text);

        // 유니코드로 변환된 글이 한글코드 안에 있으면 초중성으로 분리한다
        // 원본에서 약간 수정함. 한글 외 글자에서 중복패턴이 나오는 부분 수정함.
        // 단, 한글외 [0-9a-Z]는 확인했지만 그 외 문자에서는 확인 해 보지 않음.
        foreach ($result AS $val) {
            if ($val >= 44032 && $val <= 55203) {
                $chr = "";
                $code = $val;
                $temp1 = $code - 44032;
                $T = (int)$temp1 % 28;
                $temp1 /= 28;
                $V = (int)$temp1 % 21;
                $temp1 /= 21;
                $L = (int)$temp1;
                $chr .= $LCetable[$L] . $MVetable[$V] . $TCetable[$T];

                $returnValue .= ucfirst($chr);
            } else {
                $returnValue .= chr($val);
            }
        }
        return $returnValue;
    }

    /**
     * 슬러그 타이틀 변경.
     * @param string $str
     * @param array $options
     * @return string
     */
    public static function convertSlugString(string $str, array $options = []) : string
    {
        // $slug = preg_replace('/\?/u', ' ', trim($str));
        // $slug = preg_replace('/\s+/u', '-', trim($slug));

        // Make sure string is in UTF-8 and strip invalid UTF-8 characters
        $str = mb_convert_encoding((string)$str, 'UTF-8', mb_list_encodings());

        $defaults = [
            'delimiter' => '-',
            'limit' => null,
            'lowercase' => true,
            'replacements' => [],
            'transliterate' => false, // 영어로 바꿔주는 옵션.
        ];
        // Merge options
        $options = array_merge($defaults, $options);

        // Make custom replacements
        $str = preg_replace(array_keys($options['replacements']), $options['replacements'], $str);

        // Transliterate characters to ASCII
        if ($options['transliterate']) {
            $str = static::convertHangulToEnglish($str);
        }

        // Replace non-alphanumeric characters with our delimiter
        $str = preg_replace('/[^\p{L}\p{Nd}]+/u', $options['delimiter'], $str);

        // Remove duplicate delimiters
        $str = preg_replace('/(' . preg_quote($options['delimiter'], '/') . '){2,}/', '$1', $str);

        // Truncate slug to max. characters
        $str = mb_substr($str, 0, ($options['limit'] ? $options['limit'] : mb_strlen($str, 'UTF-8')), 'UTF-8');

        // Remove delimiter from ends
        $str = trim($str, $options['delimiter']);

        return $options['lowercase'] ? mb_strtolower($str, 'UTF-8') : $str;
    }

    /**
     * 본문에서 썸네일 추출
     * @param String $contentsText
     * @return string
     */
    public static function getThumbnailInContents(String $contentsText = '') : string
    {
        preg_match_all("/[image[^>]*src=[\"']?([^>\"']+)[\"']?[^>]*>/i", $contentsText, $matches);
        $imageMatches = isset($matches[1]) && $matches[1] ? $matches[1] : [];

        if(isset($imageMatches[0]) && $imageMatches[0]) {
            return basename($imageMatches[0]);
        }

        return '';
    }

    /**
     * 본문에서 썸네일 추출 임시.
     * @param String $contentsText
     * @return string
     */
    public static function getThumbnailInContents2(String $contentsText = '') : string
    {

        $doc = new DOMDocument();
        $doc->loadHTML($contentsText);
        $xpath = new DOMXPath($doc);
        $src = $xpath->evaluate("string(//image/@src)");

        return $src;
    }
}
