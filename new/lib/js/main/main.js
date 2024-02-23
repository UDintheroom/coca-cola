let mainFunc = null;

$(function() {
	$.funcMain = function() {
		let _this = this;

		this.opt = {
			
		}

		this.init = function() {

			$('.popup--new .popupImg .swiper--pop .swiper-wrapper .swiper-slide').remove();

			setTimeout(function() {
				_this.getPopupList();
			}, 1000*3)
		}

		this.getPopupList = function() {
			let param = {
				
			}

			$.ajax({
				url: __baseRoot + '/xmlData/popup_list.php',		// 요청 할 주소
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

							if ($.cookie("c_nopopup_mo") != "N") {

								$(popupList).each(function(idx) {

									let info = popupList[idx];

									let files = info.files;

									let popupImg_mo = null;

									$(files).each(function(fileIdx) {
										let fileInfo = files[fileIdx];
									
										if (fileInfo["FILE_KIND"] == "popupImg_mo") {
											popupImg_mo = fileInfo;
										}
									})

									if (popupImg_mo != null) {
										let popupData = '';

										popupData += '	<div class="swiper-slide">';
										if (info.mo_link_url != "") {
											popupData += '		<a href="' + info.mo_link_url + (info.is_new_win == "N" ? '" target="_blank"':'' ) + '"><img src="' + popupImg_mo["SAVE_PATH"] + popupImg_mo["SAVE_FILE_NM"] + '"></a>';
										} else {
											popupData += '		<img src="' + popupImg_mo["SAVE_PATH"] + popupImg_mo["SAVE_FILE_NM"] + '">';
										}
										popupData += '	</div>';

										$('.popup--new .popupImg .swiper--pop .swiper-wrapper').append(popupData);
									}
								
								})

								if ($('.popup--new .popupImg .swiper--pop .swiper-wrapper .swiper-slide').length > 0) {
									/*
									$('.popup--new .popupImg .swiper--pop .swiper-wrapper .swiper-slide img').each(function() {
										$(this).css("height", $('.popup--new .popupImg .swiper--pop .swiper-wrapper').height())
									})
									*/
									$('.popup--new').show();
								}

								$('#layerPopClose').off().on('click', function(e) {
									e.preventDefault();
									
									$('.popup--new').hide();
								})

								$('#noTodayPoup').off().on('click', function(e) {
									e.preventDefault();

									$.cookie("c_nopopup_mo", "N", {expires:1});

									$('#layerPopClose').click();
								})
							}
						}
					}
				},
				error: function(jqXHR) {					// 요청 실패.

				},
				complete: function(jqXHR) {				// 요청의 실패, 성공과 상관 없이 완료 될 경우 호출
					//removeLoading();
				}
			});
		}

        this.listInit = function(page) {
			$('#btn_list').hide();
			$('#btn_search').on('click', function(e) {
				e.preventDefault();
				
				_this.opt.searchType = $('#searchType').val();
				_this.opt.searchText = $('#searchText').val();

				_this.getList(1);
			});

			$('#btn_list').on('click', function(e) {
				e.preventDefault();

				$('#searchType').val("");
				$('#searchText').val("");
				_this.opt.searchType = "";
				_this.opt.searchText = "";

				_this.getList(1);
			});

            _this.getList(page);
        }

        this.getList = function(page) {

            let param = {
				"page": page
				, "recordCountPerPage": _this.opt.recordCountPerPage
				, "searchType": _this.opt.searchType
				, "searchText": _this.opt.searchText
			}

			$.ajax({
				url: __basePath + '/xmlData/notice_list.php',		// 요청 할 주소
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

                        let noticeInfo = jqXHR.data.noticeInfo;
                        let totalPage = noticeInfo.total_page;
                        let totalCnt = noticeInfo.total_cnt;

                        let topList = jqXHR.data.topList;
						let noticeList = jqXHR.data.noticeList;
						let topCnt = 0;
						let noticeCnt = 0;

						$('#noticeList tr').remove();

						if (topList != null) {
							
                            $(topList).each(function(index) {
                                let topInfo = topList[index];
                                
								let addList = '';

								addList += '	<tr class="notice--tr">';
								addList += '		<td>';
								addList += '			<span class="icon notice"></span>';
								addList += '		</td>';
								addList += '		<td class="tit">';
								addList += '			<a href="./06_view.html?idx=' + topInfo.idx + '">';
								addList += '				<b class="notice--b">[공지]</b> ' + topInfo.title + ( topInfo.is_notice < 7 ? '<span class="icon new"></span>' : '' );
								addList += '			</a>';
								addList += '		</td>';
								addList += '		<td>' + topInfo.show_date + '</td>';
								addList += '	</tr>';
								$('#noticeList').append(addList);

								topCnt++;
                            })
						}

                        if (noticeList != null) {
							
                            $(noticeList).each(function(index) {
                                let noticeInfo = noticeList[index];
                                
								let addList = '';
								
								addList += '	<tr>';
								addList += '		<td>9</td>';
								addList += '		<td class="tit">';
								addList += '			<a href="./06_view.html?idx=' + noticeInfo.idx + '">';
								addList += '				' + ( noticeInfo.type != "" ? '<b>[' + noticeInfo.type + ']</b> ' : '' ) + noticeInfo.title + ( noticeInfo.is_notice < 7 ? '<span class="icon new"></span>' : '' );
								addList += '			</a>';
								addList += '		</td>';
								addList += '		<td>' + noticeInfo.show_date + '</td>';
								addList += '	</tr>';
								
								$('#noticeList').append(addList);

								noticeCnt++;
                            })
                        }

						if (topCnt + noticeCnt == 0) {
							$('#noticeList').append('<tr><td colspan="3">자료가 없습니다.</td></tr>');
						}

						if (_this.opt.searchText != "") {
							$('#btn_list').show();
						} else {
							$('#btn_list').hide();
						}

						$('#pagination').html(frontPagingShort2(totalCnt, 10, page, 10, "noticeFunc.getList"));

					} else {
						alert(resultMsg);
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
