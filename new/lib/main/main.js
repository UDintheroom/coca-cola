let mainFunc = null;

$(function() {
	$.funcMain = function() {
		let _this = this;

		this.opt = {

		}

		this.init = function() {
			$('.layerPop-overlay').hide();
			$('.layerPop-wrap').remove();

			if ($.cookie("c_nopopup_pc") != "N") {
				setTimeout(function() {
					_this.getPopupList();
				}, 1000*3);
			}
		}

		this.getPopupList = function() {
			let param = {

			}

			$.ajax({
				url: __basePath + '/xmlData/popup_list.php',		// 요청 할 주소
				async: true,							// false 일 경우 동기 요청으로 변경
				type: 'GET', 							// GET, PUT, DELETE
				data: param,										// 전송할 데이터
				dataType: 'json',						// xml, json, script, html
				beforeSend: function(jqXHR) {		// 서버 요청 전 호출 되는 함수 return false; 일 경우 요청 중단
					//addLoading();
				},
				success: function(jqXHR) {			// 요청 완료 시

					let resultCode = jqXHR.result.resultCode;
					let resultMsg = jqXHR.result.msg;

					if (resultCode == "1") {

                        let popupInfo = jqXHR.data.popupInfo;
                        let popupList = jqXHR.data.popupList;

						if (popupInfo.total_cnt > 0) {

							let popupWrap = '';
							let popupData = '';

							$(popupList).each(function(idx) {

								let info = popupList[idx];

								if ($.cookie("c_nopopup_" + info["idx"]) != "N") {

									let files = info.files;

									let popupImg_pc = null;

									$(files).each(function(fileIdx) {
										let fileInfo = files[fileIdx];

										if (fileInfo["FILE_KIND"] == "popupImg_pc") {
											popupImg_pc = fileInfo;
										}
									})

									if (popupImg_pc != null) {

										//popupData += '	<div class="layerPop-wrap" data-idx="' +  info["idx"] + '" style="z-index:' + (10000 + info["idx"]) + '">';
										//popupData += '		<div class="layerPopTop">';
										//popupData += '			<input type="checkbox" class="noTodayPoup" id="todayNoPopchk_' + info["idx"] + '"><label for="todayNoPopchk_' + info["idx"] + '" class="label">오늘 하루 전체 닫기</label>';
										//popupData += '			<button class="layerPopClose"><img src="/new/images/common/all_menu_close.png"></button>';
										//popupData += '		</div>';
										//popupData += '		<div class="layerPopCont" data-idx="' +  info["idx"] + '" style="z-index:' + (10000 + info["idx"]) + '">';
										popupData += '			<div class="layerPop"  data-idx="' +  info["idx"] + '" style="z-index:' + (10000 + info["idx"]) + '">';
										if (info.pc_link_url != "") {
											popupData += '				<a href="' + info.pc_link_url + (info.is_new_win == "N"? '" target="_blank"':'') + '"><img src="' + popupImg_pc["SAVE_PATH"] + popupImg_pc["SAVE_FILE_NM"] + '"></a>';
										} else {
											popupData += '				<a href="#"><img src="' + popupImg_pc["SAVE_PATH"] + popupImg_pc["SAVE_FILE_NM"] + '"></a>';
										}
										popupData += '				<div class="popup-bt"><a href="#" class="noTodayPoup">1일 동안 보지 않음</a> <a href="#" class="layerPopClose">닫기</a></div>';
										popupData += '			</div>';
										//popupData += '		</div>';
										//popupData += '	</div>';

										//$('body').append(popupData);
									}
								}
							})

							if (popupData != "") {
								popupWrap += '	<div class="layerPop-wrap">';
								popupWrap += '		<div class="layerPopTop">';
								popupWrap += '			<input type="checkbox" class="noTodayPoup" id="todayNoPopchk"><label for="todayNoPopchk" class="label">오늘 하루 전체 닫기</label>';
								popupWrap += '			<button class="layerPopClose"><img src="/new/images/common/all_menu_close.png"></button>';
								popupWrap += '		</div>';
								popupWrap += '		<div class="layerPopCont">';
								/*
								popupData += '			<div class="layerPop">';
								if (info.pc_link_url != "") {
									popupData += '				<a href="' + info.pc_link_url + (info.is_new_win == "N"? '" target="_blank"':'') + '"><img src="' + popupImg_pc["SAVE_PATH"] + popupImg_pc["SAVE_FILE_NM"] + '" style="width:' + info["width"] + 'px;height:' + info["height"] + 'px"></a>';
								} else {
									popupData += '				<a href="#"><img src="' + popupImg_pc["SAVE_PATH"] + popupImg_pc["SAVE_FILE_NM"] + '"></a>';
								}
								popupData += '				<div class="popup-bt"><a href="#" class="noTodayPoup">1일 동안 보지 않음</a> <a href="#" class="layerPopClose">닫기</a></div>';
								popupData += '			</div>';
								*/
								popupWrap += '		</div>';
								popupWrap += '	</div>';

								$('body').append(popupWrap);
								$('body .layerPop-wrap .layerPopCont').append(popupData);

								$('.layerPop-wrap .layerPopCont .layerPop > a > img').css({"width":"300px","height":"400px"});

								$('.layerPopTop .layerPopClose').off().on('click', function() {
									if ($('#todayNoPopchk').is(':checked')) {
										$.cookie("c_nopopup_pc", "N", {expires:1});
									}

									$('.layerPop-wrap .layerPopCont').remove();
									$('.layerPop-wrap').remove();
									$('.layerPop-overlay').hide();
								})
							}

							if ($('.layerPop-wrap .layerPopCont .layerPop').length > 0) {
								$('.layerPop-overlay').show();
							}

							$('.layerPopCont .layerPop .layerPopClose').off().on('click', function(e) {
								e.preventDefault();

								$(this).closest('.layerPop').remove();

								if ($('.layerPop').length == 0) {
									$('.layerPop-wrap').remove();
									$('.layerPop-overlay').hide();
								}

							})

							$('.layerPopCont .layerPop .noTodayPoup').off().on('click', function(e) {
								e.preventDefault();

								let idx = $(this).closest('.layerPop').attr('data-idx');

								$.cookie("c_nopopup_" + idx, "N", {expires:1});

								$(this).closest('.layerPop').find('.layerPopClose').click();

							})
						}

						/*
						if ($('.layerPop-wrap').length > 0) {
							$('.layerPop-overlay').show();
						} else {
							$('.layerPop-overlay').hide();
						}
						*/
					}
				},
				error: function(jqXHR) {					// 요청 실패.

				},
				complete: function(jqXHR) {				// 요청의 실패, 성공과 상관 없이 완료 될 경우 호출
					//removeLoading();
				}
			});
		}

		this.getPopupList2 = function() {
			let param = {

			}

			$.ajax({
				url: __basePath + '/xmlData/popup_list.php',		// 요청 할 주소
				async: true,							// false 일 경우 동기 요청으로 변경
				type: 'GET', 							// GET, PUT, DELETE
				data: param,										// 전송할 데이터
				dataType: 'json',						// xml, json, script, html
				beforeSend: function(jqXHR) {		// 서버 요청 전 호출 되는 함수 return false; 일 경우 요청 중단
					//addLoading();
				},
				success: function(jqXHR) {			// 요청 완료 시

					let resultCode = jqXHR.result.resultCode;
					let resultMsg = jqXHR.result.msg;

					if (resultCode == "1") {

                        let popupInfo = jqXHR.data.popupInfo;
                        let popupList = jqXHR.data.popupList;

						if (popupInfo.total_cnt > 0) {

							let popupWrap = '';
							let popupData = '';

							$(popupList).each(function(idx) {

								let info = popupList[idx];

								if ($.cookie("c_nopopup_" + info["idx"]) != "N") {

									let files = info.files;

									let popupImg_pc = null;

									$(files).each(function(fileIdx) {
										let fileInfo = files[fileIdx];

										if (fileInfo["FILE_KIND"] == "popupImg_pc") {
											popupImg_pc = fileInfo;
										}
									})

									if (popupImg_pc != null) {

										popupData  = '	<div class="layerPop-wrap" data-idx="' +  info["idx"] + '" style="z-index:' + (10000 + info["idx"]) + '">';
										popupData += '		<div class="layerPopTop">';
										popupData += '			<input type="checkbox" class="noTodayPoup" id="todayNoPopchk_' + info["idx"] + '"><label for="todayNoPopchk_' + info["idx"] + '" class="label">오늘 하루 전체 닫기</label>';
										popupData += '			<button class="layerPopClose"><img src="/new/images/common/all_menu_close.png"></button>';
										popupData += '		</div>';
										popupData += '		<div class="layerPopCont" data-idx="' +  info["idx"] + '" style="z-index:' + (10000 + info["idx"]) + '">';
										popupData += '			<div class="layerPop">';
										if (info.pc_link_url != "") {
											popupData += '				<a href="' + info.pc_link_url + (info.is_new_win == "N"? '" target="_blank"':'') + '"><img src="' + popupImg_pc["SAVE_PATH"] + popupImg_pc["SAVE_FILE_NM"] + '"></a>';
										} else {
											popupData += '				<a href="#"><img src="' + popupImg_pc["SAVE_PATH"] + popupImg_pc["SAVE_FILE_NM"] + '"></a>';
										}
										popupData += '				<div class="popup-bt"><a href="#" class="noTodayPoup">1일 동안 보지 않음</a> <a href="#" class="layerPopClose">닫기</a></div>';
										popupData += '			</div>';
										popupData += '		</div>';
										popupData += '	</div>';

										$('body').append(popupData);
									}
								}
							})

							if ($('.layerPop-wrap').length > 0) {
								$('.layerPop-overlay').show();
							}

							$('.layerPopCont .layerPopClose').off().on('click', function(e) {
								e.preventDefault();

								$(this).closest('.layerPop-wrap').remove();

								if ($('.layerPop-wrap').length == 0) {
									//$('.layerPop-wrap').remove();
									$('.layerPop-overlay').hide();
								}

							})

							$('.layerPopCont .noTodayPoup').off().on('click', function(e) {
								e.preventDefault();

								let idx = $(this).closest('.layerPop-wrap').attr('data-idx');

								$.cookie("c_nopopup_" + idx, "N", {expires:1});

								$(this).closest('.layerPop-wrap').find('.layerPopClose:eq(1)').click();

							})

							$('.layerPopTop .layerPopClose').off().on('click', function(e) {
								e.preventDefault();

								if ($(this).closest('.layerPopTop').find('.noTodayPoup').is(':checked')) {
									$.cookie("c_nopopup_pc", "N", {expires:1});
								}

								$('.layerPop-wrap').remove();
								$('.layerPop-overlay').hide();
							})

							$('.layerPopTop .noTodayPoup').off().on('click', function() {

								let is_checked = $(this).is(':checked');

								$('.layerPopTop .noTodayPoup').each(function() {
									$(this).prop('checked', is_checked);
								})
							})
						}

						/*
						if ($('.layerPop-wrap').length > 0) {
							$('.layerPop-overlay').show();
						} else {
							$('.layerPop-overlay').hide();
						}
						*/
					}
				},
				error: function(jqXHR) {					// 요청 실패.

				},
				complete: function(jqXHR) {				// 요청의 실패, 성공과 상관 없이 완료 될 경우 호출
					//removeLoading();
				}
			});
		}
    }
});
