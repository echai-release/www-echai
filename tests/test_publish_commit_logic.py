import os

from scripts import publish_blogs


def test_is_commit_allowed_local():
    # when not in CI and no no-commit flag, commits allowed
    os.environ.pop("GITHUB_ACTIONS", None)
    assert publish_blogs.is_commit_allowed(no_commit_flag=False) is True


def test_is_commit_disallowed_in_ci():
    # in CI we disallow commits even with default flags
    os.environ["GITHUB_ACTIONS"] = "true"
    assert publish_blogs.is_commit_allowed(no_commit_flag=False) is False


def test_is_commit_disallowed_with_flag():
    os.environ.pop("GITHUB_ACTIONS", None)
    assert publish_blogs.is_commit_allowed(no_commit_flag=True) is False
