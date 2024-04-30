'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">nest-101 documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-bs-toggle="collapse" ${ isNormalMode ?
                                'data-bs-target="#modules-links"' : 'data-bs-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-AppModule-3db6b953bc840fb6b74e19dfa13c9b98ddc24ce4d311d3d4e85fef4f9656b09be0d20f86cbbd9abcffacd967f10d6393e1e38d3235fa54dd720fa61843062f60"' : 'data-bs-target="#xs-controllers-links-module-AppModule-3db6b953bc840fb6b74e19dfa13c9b98ddc24ce4d311d3d4e85fef4f9656b09be0d20f86cbbd9abcffacd967f10d6393e1e38d3235fa54dd720fa61843062f60"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AppModule-3db6b953bc840fb6b74e19dfa13c9b98ddc24ce4d311d3d4e85fef4f9656b09be0d20f86cbbd9abcffacd967f10d6393e1e38d3235fa54dd720fa61843062f60"' :
                                            'id="xs-controllers-links-module-AppModule-3db6b953bc840fb6b74e19dfa13c9b98ddc24ce4d311d3d4e85fef4f9656b09be0d20f86cbbd9abcffacd967f10d6393e1e38d3235fa54dd720fa61843062f60"' }>
                                            <li class="link">
                                                <a href="controllers/AppController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppController</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AuthModule.html" data-type="entity-link" >AuthModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-AuthModule-9ecd28f357d45259b30c29a885fe34955978a863bf54528185dd1910015c143bb75e91242687a64d21e9c37dd0b11bad382c2e7663d5fd5802487be1967c5d8f"' : 'data-bs-target="#xs-controllers-links-module-AuthModule-9ecd28f357d45259b30c29a885fe34955978a863bf54528185dd1910015c143bb75e91242687a64d21e9c37dd0b11bad382c2e7663d5fd5802487be1967c5d8f"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AuthModule-9ecd28f357d45259b30c29a885fe34955978a863bf54528185dd1910015c143bb75e91242687a64d21e9c37dd0b11bad382c2e7663d5fd5802487be1967c5d8f"' :
                                            'id="xs-controllers-links-module-AuthModule-9ecd28f357d45259b30c29a885fe34955978a863bf54528185dd1910015c143bb75e91242687a64d21e9c37dd0b11bad382c2e7663d5fd5802487be1967c5d8f"' }>
                                            <li class="link">
                                                <a href="controllers/AuthController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AuthModule-9ecd28f357d45259b30c29a885fe34955978a863bf54528185dd1910015c143bb75e91242687a64d21e9c37dd0b11bad382c2e7663d5fd5802487be1967c5d8f"' : 'data-bs-target="#xs-injectables-links-module-AuthModule-9ecd28f357d45259b30c29a885fe34955978a863bf54528185dd1910015c143bb75e91242687a64d21e9c37dd0b11bad382c2e7663d5fd5802487be1967c5d8f"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AuthModule-9ecd28f357d45259b30c29a885fe34955978a863bf54528185dd1910015c143bb75e91242687a64d21e9c37dd0b11bad382c2e7663d5fd5802487be1967c5d8f"' :
                                        'id="xs-injectables-links-module-AuthModule-9ecd28f357d45259b30c29a885fe34955978a863bf54528185dd1910015c143bb75e91242687a64d21e9c37dd0b11bad382c2e7663d5fd5802487be1967c5d8f"' }>
                                        <li class="link">
                                            <a href="injectables/AuthService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/JwtStrategy.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >JwtStrategy</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/FilesModule.html" data-type="entity-link" >FilesModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-FilesModule-39015957a5c83aa5d60ae5654f982c660732c9a9e19b5d12dce66d32cab0d8bc838658269fd0f45c10fb77940ecf5bbb9a5c72a43a8ab1fdab314e88d7cb99c8"' : 'data-bs-target="#xs-controllers-links-module-FilesModule-39015957a5c83aa5d60ae5654f982c660732c9a9e19b5d12dce66d32cab0d8bc838658269fd0f45c10fb77940ecf5bbb9a5c72a43a8ab1fdab314e88d7cb99c8"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-FilesModule-39015957a5c83aa5d60ae5654f982c660732c9a9e19b5d12dce66d32cab0d8bc838658269fd0f45c10fb77940ecf5bbb9a5c72a43a8ab1fdab314e88d7cb99c8"' :
                                            'id="xs-controllers-links-module-FilesModule-39015957a5c83aa5d60ae5654f982c660732c9a9e19b5d12dce66d32cab0d8bc838658269fd0f45c10fb77940ecf5bbb9a5c72a43a8ab1fdab314e88d7cb99c8"' }>
                                            <li class="link">
                                                <a href="controllers/FilesController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FilesController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-FilesModule-39015957a5c83aa5d60ae5654f982c660732c9a9e19b5d12dce66d32cab0d8bc838658269fd0f45c10fb77940ecf5bbb9a5c72a43a8ab1fdab314e88d7cb99c8"' : 'data-bs-target="#xs-injectables-links-module-FilesModule-39015957a5c83aa5d60ae5654f982c660732c9a9e19b5d12dce66d32cab0d8bc838658269fd0f45c10fb77940ecf5bbb9a5c72a43a8ab1fdab314e88d7cb99c8"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-FilesModule-39015957a5c83aa5d60ae5654f982c660732c9a9e19b5d12dce66d32cab0d8bc838658269fd0f45c10fb77940ecf5bbb9a5c72a43a8ab1fdab314e88d7cb99c8"' :
                                        'id="xs-injectables-links-module-FilesModule-39015957a5c83aa5d60ae5654f982c660732c9a9e19b5d12dce66d32cab0d8bc838658269fd0f45c10fb77940ecf5bbb9a5c72a43a8ab1fdab314e88d7cb99c8"' }>
                                        <li class="link">
                                            <a href="injectables/FilesService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FilesService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/GatewayModule.html" data-type="entity-link" >GatewayModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/PrismaModule.html" data-type="entity-link" >PrismaModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-PrismaModule-0a30996d1235bf2604a3c3e09c8f1199d43cb26cc3a3c409db2ea23ad71bf181806b1da96cfc90d204e717a917b83b7d35bd1c8bff82b9170de5064b4a322113"' : 'data-bs-target="#xs-injectables-links-module-PrismaModule-0a30996d1235bf2604a3c3e09c8f1199d43cb26cc3a3c409db2ea23ad71bf181806b1da96cfc90d204e717a917b83b7d35bd1c8bff82b9170de5064b4a322113"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-PrismaModule-0a30996d1235bf2604a3c3e09c8f1199d43cb26cc3a3c409db2ea23ad71bf181806b1da96cfc90d204e717a917b83b7d35bd1c8bff82b9170de5064b4a322113"' :
                                        'id="xs-injectables-links-module-PrismaModule-0a30996d1235bf2604a3c3e09c8f1199d43cb26cc3a3c409db2ea23ad71bf181806b1da96cfc90d204e717a917b83b7d35bd1c8bff82b9170de5064b4a322113"' }>
                                        <li class="link">
                                            <a href="injectables/PrismaService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PrismaService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/ProfileModule.html" data-type="entity-link" >ProfileModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-ProfileModule-e7a542417e70e54e66d2790263baf9c349dd76569d99db204ee0f7ed9a507f665806e03c4a594ee20e8389a6c085dbcf5a96750942fe65e3e8809c7e7a0889b6"' : 'data-bs-target="#xs-controllers-links-module-ProfileModule-e7a542417e70e54e66d2790263baf9c349dd76569d99db204ee0f7ed9a507f665806e03c4a594ee20e8389a6c085dbcf5a96750942fe65e3e8809c7e7a0889b6"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-ProfileModule-e7a542417e70e54e66d2790263baf9c349dd76569d99db204ee0f7ed9a507f665806e03c4a594ee20e8389a6c085dbcf5a96750942fe65e3e8809c7e7a0889b6"' :
                                            'id="xs-controllers-links-module-ProfileModule-e7a542417e70e54e66d2790263baf9c349dd76569d99db204ee0f7ed9a507f665806e03c4a594ee20e8389a6c085dbcf5a96750942fe65e3e8809c7e7a0889b6"' }>
                                            <li class="link">
                                                <a href="controllers/ProfileController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ProfileController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-ProfileModule-e7a542417e70e54e66d2790263baf9c349dd76569d99db204ee0f7ed9a507f665806e03c4a594ee20e8389a6c085dbcf5a96750942fe65e3e8809c7e7a0889b6"' : 'data-bs-target="#xs-injectables-links-module-ProfileModule-e7a542417e70e54e66d2790263baf9c349dd76569d99db204ee0f7ed9a507f665806e03c4a594ee20e8389a6c085dbcf5a96750942fe65e3e8809c7e7a0889b6"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-ProfileModule-e7a542417e70e54e66d2790263baf9c349dd76569d99db204ee0f7ed9a507f665806e03c4a594ee20e8389a6c085dbcf5a96750942fe65e3e8809c7e7a0889b6"' :
                                        'id="xs-injectables-links-module-ProfileModule-e7a542417e70e54e66d2790263baf9c349dd76569d99db204ee0f7ed9a507f665806e03c4a594ee20e8389a6c085dbcf5a96750942fe65e3e8809c7e7a0889b6"' }>
                                        <li class="link">
                                            <a href="injectables/ProfileService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ProfileService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/RedisModule.html" data-type="entity-link" >RedisModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-RedisModule-11f0326847fe96e216470aae819d0bab47edbf99636567c50a5577e2649bf9e0964ba6c9a385919e5405175aabf80c769f9edeb6495781705e1e4270df002272"' : 'data-bs-target="#xs-injectables-links-module-RedisModule-11f0326847fe96e216470aae819d0bab47edbf99636567c50a5577e2649bf9e0964ba6c9a385919e5405175aabf80c769f9edeb6495781705e1e4270df002272"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-RedisModule-11f0326847fe96e216470aae819d0bab47edbf99636567c50a5577e2649bf9e0964ba6c9a385919e5405175aabf80c769f9edeb6495781705e1e4270df002272"' :
                                        'id="xs-injectables-links-module-RedisModule-11f0326847fe96e216470aae819d0bab47edbf99636567c50a5577e2649bf9e0964ba6c9a385919e5405175aabf80c769f9edeb6495781705e1e4270df002272"' }>
                                        <li class="link">
                                            <a href="injectables/RedisService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RedisService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/SignHistoryModule.html" data-type="entity-link" >SignHistoryModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-SignHistoryModule-1d9fd6cf7c08a15880a7cde58d00d702caddec191effce03dbf60d2bb1170d0f104076516aa7696ee4e3c928c25cca428aeb5c3d865024c0628715c543f84dcf"' : 'data-bs-target="#xs-controllers-links-module-SignHistoryModule-1d9fd6cf7c08a15880a7cde58d00d702caddec191effce03dbf60d2bb1170d0f104076516aa7696ee4e3c928c25cca428aeb5c3d865024c0628715c543f84dcf"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-SignHistoryModule-1d9fd6cf7c08a15880a7cde58d00d702caddec191effce03dbf60d2bb1170d0f104076516aa7696ee4e3c928c25cca428aeb5c3d865024c0628715c543f84dcf"' :
                                            'id="xs-controllers-links-module-SignHistoryModule-1d9fd6cf7c08a15880a7cde58d00d702caddec191effce03dbf60d2bb1170d0f104076516aa7696ee4e3c928c25cca428aeb5c3d865024c0628715c543f84dcf"' }>
                                            <li class="link">
                                                <a href="controllers/SignHistoryController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SignHistoryController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-SignHistoryModule-1d9fd6cf7c08a15880a7cde58d00d702caddec191effce03dbf60d2bb1170d0f104076516aa7696ee4e3c928c25cca428aeb5c3d865024c0628715c543f84dcf"' : 'data-bs-target="#xs-injectables-links-module-SignHistoryModule-1d9fd6cf7c08a15880a7cde58d00d702caddec191effce03dbf60d2bb1170d0f104076516aa7696ee4e3c928c25cca428aeb5c3d865024c0628715c543f84dcf"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-SignHistoryModule-1d9fd6cf7c08a15880a7cde58d00d702caddec191effce03dbf60d2bb1170d0f104076516aa7696ee4e3c928c25cca428aeb5c3d865024c0628715c543f84dcf"' :
                                        'id="xs-injectables-links-module-SignHistoryModule-1d9fd6cf7c08a15880a7cde58d00d702caddec191effce03dbf60d2bb1170d0f104076516aa7696ee4e3c928c25cca428aeb5c3d865024c0628715c543f84dcf"' }>
                                        <li class="link">
                                            <a href="injectables/SignHistoryService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SignHistoryService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/UsersModule.html" data-type="entity-link" >UsersModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-UsersModule-ca29f5a65a977c648fbec096bd027dc3050d8b42f231670c0e256c7fedf1cd929a5fbe62be08952173a3f8caccd410d31e6017cfb94b60bde79baf9f62bcd3ea"' : 'data-bs-target="#xs-injectables-links-module-UsersModule-ca29f5a65a977c648fbec096bd027dc3050d8b42f231670c0e256c7fedf1cd929a5fbe62be08952173a3f8caccd410d31e6017cfb94b60bde79baf9f62bcd3ea"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-UsersModule-ca29f5a65a977c648fbec096bd027dc3050d8b42f231670c0e256c7fedf1cd929a5fbe62be08952173a3f8caccd410d31e6017cfb94b60bde79baf9f62bcd3ea"' :
                                        'id="xs-injectables-links-module-UsersModule-ca29f5a65a977c648fbec096bd027dc3050d8b42f231670c0e256c7fedf1cd929a5fbe62be08952173a3f8caccd410d31e6017cfb94b60bde79baf9f62bcd3ea"' }>
                                        <li class="link">
                                            <a href="injectables/UsersService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsersService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#classes-links"' :
                            'data-bs-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/EventGateway.html" data-type="entity-link" >EventGateway</a>
                            </li>
                            <li class="link">
                                <a href="classes/SignIn.html" data-type="entity-link" >SignIn</a>
                            </li>
                            <li class="link">
                                <a href="classes/SignUp.html" data-type="entity-link" >SignUp</a>
                            </li>
                            <li class="link">
                                <a href="classes/TokenPayload.html" data-type="entity-link" >TokenPayload</a>
                            </li>
                            <li class="link">
                                <a href="classes/TokenResponse.html" data-type="entity-link" >TokenResponse</a>
                            </li>
                            <li class="link">
                                <a href="classes/UserRequest.html" data-type="entity-link" >UserRequest</a>
                            </li>
                            <li class="link">
                                <a href="classes/UserResponse.html" data-type="entity-link" >UserResponse</a>
                            </li>
                            <li class="link">
                                <a href="classes/UserUpdate.html" data-type="entity-link" >UserUpdate</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#injectables-links"' :
                                'data-bs-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/JwtAuthGuard.html" data-type="entity-link" >JwtAuthGuard</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/SharpPipe.html" data-type="entity-link" >SharpPipe</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#miscellaneous-links"'
                            : 'data-bs-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank" rel="noopener noreferrer">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});