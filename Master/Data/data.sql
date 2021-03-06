PGDMP                         x           race    12.2    12.2 	    F           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            G           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            H           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            I           1262    17129    race    DATABASE     b   CREATE DATABASE race WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'C' LC_CTYPE = 'C';
    DROP DATABASE race;
                postgres    false            �            1259    17166    race    TABLE     �  CREATE TABLE public.race (
    "Date" character varying,
    "State" character varying,
    "Latitude" character varying,
    "Longitude" character varying,
    "Cases_Total" character varying,
    "Cases_White" character varying,
    "Cases_Black" character varying,
    "Cases_LatinX" character varying,
    "Cases_Asian" character varying,
    "Cases_AIAN" character varying,
    "Cases_NHPI" character varying,
    "Cases_Multiracial" character varying,
    "Cases_Other" character varying,
    "Cases_Unknown" character varying,
    "Cases_Ethnicity_Hispanic" character varying,
    "Cases_Ethnicity_NonHispanic" character varying,
    "Cases_Ethnicity_Unknown" character varying,
    "Deaths_Total" character varying,
    "Deaths_White" character varying,
    "Deaths_Black" character varying,
    "Deaths_LatinX" character varying,
    "Deaths_Asian" character varying,
    "Deaths_AIAN" character varying,
    "Deaths_NHPI" character varying,
    "Deaths_Multiracial" character varying,
    "Deaths_Other" character varying,
    "Deaths_Unknown" character varying,
    "Deaths_Ethnicity_Hispanic" character varying,
    "Deaths_Ethnicity_NonHispanic" character varying,
    "Deaths_Ethnicity_Unknown" character varying
);
    DROP TABLE public.race;
       public         heap    postgres    false            �            1259    17173    state_covid    TABLE     �  CREATE TABLE public.state_covid (
    "State" character varying NOT NULL,
    "Date" character varying,
    "Latitude" character varying,
    "Longitude" character varying,
    "Cases_Total" character varying,
    "Cases_White" character varying,
    "Cases_Black" character varying,
    "Cases_LatinX" character varying,
    "Cases_Asian" character varying,
    "Cases_AIAN" character varying,
    "Cases_NHPI" character varying,
    "Cases_Multiracial" character varying,
    "Cases_Other" character varying,
    "Cases_Unknown" character varying,
    "Cases_Ethnicity_Hispanic" character varying,
    "Cases_Ethnicity_NonHispanic" character varying,
    "Cases_Ethnicity_Unknown" character varying,
    "Deaths_Total" character varying,
    "Deaths_White" character varying,
    "Deaths_Black" character varying,
    "Deaths_LatinX" character varying,
    "Deaths_Asian" character varying,
    "Deaths_AIAN" character varying,
    "Deaths_NHPI" character varying,
    "Deaths_Multiracial" character varying,
    "Deaths_Other" character varying,
    "Deaths_Unknown" character varying,
    "Deaths_Ethnicity_Hispanic" character varying,
    "Deaths_Ethnicity_NonHispanic" character varying,
    "Deaths_Ethnicity_Unknown" character varying
);
    DROP TABLE public.state_covid;
       public         heap    postgres    false            B          0    17166    race 
   TABLE DATA           ;  COPY public.race ("Date", "State", "Latitude", "Longitude", "Cases_Total", "Cases_White", "Cases_Black", "Cases_LatinX", "Cases_Asian", "Cases_AIAN", "Cases_NHPI", "Cases_Multiracial", "Cases_Other", "Cases_Unknown", "Cases_Ethnicity_Hispanic", "Cases_Ethnicity_NonHispanic", "Cases_Ethnicity_Unknown", "Deaths_Total", "Deaths_White", "Deaths_Black", "Deaths_LatinX", "Deaths_Asian", "Deaths_AIAN", "Deaths_NHPI", "Deaths_Multiracial", "Deaths_Other", "Deaths_Unknown", "Deaths_Ethnicity_Hispanic", "Deaths_Ethnicity_NonHispanic", "Deaths_Ethnicity_Unknown") FROM stdin;
    public          postgres    false    202   �       C          0    17173    state_covid 
   TABLE DATA           B  COPY public.state_covid ("State", "Date", "Latitude", "Longitude", "Cases_Total", "Cases_White", "Cases_Black", "Cases_LatinX", "Cases_Asian", "Cases_AIAN", "Cases_NHPI", "Cases_Multiracial", "Cases_Other", "Cases_Unknown", "Cases_Ethnicity_Hispanic", "Cases_Ethnicity_NonHispanic", "Cases_Ethnicity_Unknown", "Deaths_Total", "Deaths_White", "Deaths_Black", "Deaths_LatinX", "Deaths_Asian", "Deaths_AIAN", "Deaths_NHPI", "Deaths_Multiracial", "Deaths_Other", "Deaths_Unknown", "Deaths_Ethnicity_Hispanic", "Deaths_Ethnicity_NonHispanic", "Deaths_Ethnicity_Unknown") FROM stdin;
    public          postgres    false    203   9!       �           2606    17180    state_covid state_covid_pkey 
   CONSTRAINT     _   ALTER TABLE ONLY public.state_covid
    ADD CONSTRAINT state_covid_pkey PRIMARY KEY ("State");
 F   ALTER TABLE ONLY public.state_covid DROP CONSTRAINT state_covid_pkey;
       public            postgres    false    203            B   E  x�u��rI���w�;�ҥc`/`6���y���/Um�ebpW�A%�R)�����|<|8F>k*=�q�r��YO���6���Q����1ґs=���oZ�͸l�I7�{d~\���ޔ��}��s��r.�m�s�du��N<W�t��|�W���g�)��1-;�N>R��@.���Ը�լ;���܏��󘅛K�L�r�vZϮ�޼���j�%g�ç5NfaH��0lĻ�%��yy|dN���t|V׸3��f���U~ڌ����c�<1"�|zM��gK.��e�1�Ws�Q��:� -u{�/u��k�شڏ�ˌc����ꜳ��\�.�f����Y,�0˹H-˕�<QF	���)a#���cw��Rq1��Mӵ28&F�r�>p���I�2<-��Fm-��Y���敓�r�g��	�]g�eٌ�T�l��+�VGĪ�������� ��E��+����9?�8=���Aߎ�ώ�&�YZ䑁�.�Δ�XI�;B��K�����,��|-�
�@c�
��@�[I�X�rl�2��r�t'�{�LWrȜ�o����sf��敿�_��ՒpD7���� �1���&����0���ެ�-OW���9cm��&�W��J�vE!������.��!��PP��OG�4�݈|�M��b�d�s���=Ĳ6���	��r�� ��qm�1!��IT�����	����Q݁�c��9x��v��!x�&�aWa��V��\F$3Ԕ� 	��H�E(`�	��r�.��e�Db���i��<c��λQ�ᴳE��l:PdL���E��d0bc�<_��+�[��=>(_�Ϊhܼ�T sQH�m�*�����M�F��k��F፪7�52�H��i�9�E�|���f6�<�3'@���6n������8�4�AP��:U�J�Xj��(����Y^���w�^
?*?�:� ��	��_K�YPjzovPM�%�p�X\.p�;P��D7��Ԯ��d]][Eo�����B���r:��L{
���k=�tkY�ٺȽ$Â.��U�6̚ĝܐ���$�p��乻tA���������'��6_}�*2k�dC�|�U;&o9g����/4���l
'�{�Ȑ�(��"Rv��.?��C(f��?T��T�>;ޙ��NH�)����p.�P�B8^S���3lT��c����ϥ�MN:��|�2TV��&��pv89e�Ͼ}w����� jQ>���?6�=��>���L��7�'!�A7{�Oy��!��M�:B��6u@���LH������%oR��nJ����6J]�S)T�ʘd17��2�^���m�"/@��ڦ���V �(X<\�fU$����b�{mv��H�I`݆��!h�U�a,��$-BVC��ݥS��YJ���ϡE.@,�c��# <����&��P.���J�.�YV�)�Ah�y��j'n)�i����J��*�W=�Ho�?
mp���D2�HE�������0�0е�V(J�[RM�=�C�TQ)!'���_r�D��U~�B�FrR�I���	YSC�-���{��ē#��i���{Po��U֥)�
3�R��eu�W��sפ�E�lR��W)���I���R��b�
��%j����� ��ڤ"#Rp����x�(e�d��1ՊP�H��7��1���L����b"�Ң��������	$T�Y[nm�t����O�T����ߌ�;������6{	�ϥ!jo*ȫ�2��DmIj�,PA�K*���R��vY�ID�0<KX�M�>�d��+�z��!U@�˾ޜ�7�_��]4�sFn��b���b�^���J�cs�|�� ��2��*.ʂ�� �	����FO�E)�F�@�$$�QT��.�Fq�m���䧝VV�!S
�U}8�<�h��������[���SWy�9��h��~�=��*i���v	J۞��|��iӉ�Z�1�G���IV��e��Z	Mmm!�ˈ���O�](o�HgB���� SU��7���]s���b�L��A��T�/�a�q�oPZj4כ��:�P
iJg���Ms�pAx\7y�)�6^�ItLQ��>��WP���B����8U���b�)?.��.��6Q�X�$ܢ�s������'�F�WCmf�;B�+>˵9�̹���}`�im%&��p�!V�z�>�M|�����r���]]�?*��1@)SyT�8:O�1P�=R��Lݪ���5���F��׻p�$A��h1S6%�K��EN�AQ�U
������Ҹ�KT�Եl�2�R�O�����|�5P�(̢sjtP/��E�3���w4;�TE]�s���Y=V	�(��QB��	�~Pd�5]��8��)��Jt�5��\�V�Ɲ��MM2y���v!�{p"^$.ZzL��;���ڷ����W���c�-]2�m]R�ı�d(��cR��=TI,��f-�cm]:4�F��m.�ĵy����in��J�'��R�F�LC�z��x/e0�d�E���ƚ1���D6Kc+�k�h[5Y!�ۖ�_�
&�9��O�+�6-ԌDܚS�2��=F�Hk�5~�ע��o�?��I�Bl)��[��;�Vk��/J��U�����cw��j�<�{����dF�x,�~\�?qZ'�7n��@�{Uu'$�gLO��t���+Ʈs4M��|m�p�y�l��H�Le���x2Y��>����p:\���DF���D*�sk*���'��B��,�X��k�Z���yr⌁ЕzR�����F���r�R��J�!�m�@�b���a^���Q�kL%}>4Dꚽ^��i�+��#��D��ճeeNY�O�J�q�Y�X�H�l��qkӬ�Dۦ�j��
yxaU�J����*h�)��2~o�_k�?�z��Y�f(���jLW%9B�!40���*��~��]*�SFս�C�yp��5]ː�>��}��1m4g�|qM�xH-S��%��3b������e��GL�D.���ޥ |��'o��=����ʨ��%Q=����Z�5�y��;�=:�G��K�ى@%$�U��w#~���ɺ���8�Ln��;�.VП�>�䎄.o�>߼y�?���      C      x������ � �     